
/**
 * ARASUPANDIAN FARM SERVICE - BACKEND SCRIPT
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create 4 Sheets: 'Products', 'Users', 'Orders', 'Wishlist'
 * 2. Add Headers to Row 1 of each sheet as described in the documentation.
 * 3. Deploy this script as Web App (Access: Anyone).
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var req = JSON.parse(e.postData.contents);
    var action = req.action;
    
    // --- SHEET REFERENCES ---
    var productsSheet = getSheet(doc, 'Products', ['id', 'name', 'category', 'price', 'image', 'description', 'badge', 'active']);
    var usersSheet = getSheet(doc, 'Users', ['id', 'name', 'mobile', 'address', 'crop', 'status', 'date', 'role']);
    var ordersSheet = getSheet(doc, 'Orders', ['id', 'userMobile', 'items', 'totalAmount', 'status', 'date']);
    var wishlistSheet = getSheet(doc, 'Wishlist', ['id', 'userMobile', 'productId']);

    var result = {};

    switch(action) {
      
      // --- SYSTEM CHECK ---
      case 'HEALTH_CHECK':
        result = { status: 'online', time: new Date().toString() };
        break;

      // --- READ OPERATIONS ---
      case 'GET_ALL':
        result.products = getData(productsSheet);
        result.users = getData(usersSheet);
        result.orders = getData(ordersSheet);
        break;

      // --- LOGIN OPERATION ---
      case 'LOGIN':
        var mobile = String(req.mobile).replace(/\D/g, ""); // Clean input
        var users = getData(usersSheet);
        // Clean DB mobile (remove spaces, quotes, dashes) before comparing
        var userFound = users.find(function(u) { 
           return String(u.mobile).replace(/\D/g, "") === mobile; 
        });
        
        if (userFound) {
           result = { status: 'success', user: userFound };
        } else {
           result = { status: 'not_found' };
        }
        break;

      // --- PRODUCT OPERATIONS ---
      case 'ADD_PRODUCT':
        var p = req.data;
        var newId = 'p_' + Math.floor(Date.now() / 1000);
        productsSheet.appendRow([newId, p.name, p.category, p.price, p.image, p.description, p.badge, 'TRUE']);
        result = { status: 'added', id: newId };
        break;

      case 'UPDATE_PRODUCT':
        var p = req.data;
        var data = productsSheet.getDataRange().getValues();
        var found = false;
        for (var i = 1; i < data.length; i++) {
          if (String(data[i][0]) === String(p.id)) { 
            productsSheet.getRange(i + 1, 2, 1, 6).setValues([[p.name, p.category, p.price, p.image, p.description, p.badge]]);
            found = true;
            break;
          }
        }
        if (!found) throw new Error('Product ID not found');
        result = { status: 'updated' };
        break;

      case 'DELETE_PRODUCT':
        deleteRowById(productsSheet, req.id);
        result = { status: 'deleted' };
        break;

      // --- USER OPERATIONS ---
      case 'REGISTER_USER':
        var u = req.data;
        // Use Timestamp for User ID to avoid collisions and match Product ID style
        var userId = 'u_' + Math.floor(Date.now() / 1000);
        var date = "'" + new Date().toLocaleDateString('en-GB'); 
        // Save mobile with quote to prevent Excel scientific notation, but keep it clean
        var cleanMobile = String(u.mobile).replace(/\D/g, "");
        // Default status is 'pending'
        usersSheet.appendRow([userId, u.name, "'" + cleanMobile, u.address, u.crop, 'pending', date, 'farmer']);
        result = { status: 'registered', id: userId };
        break;

      case 'APPROVE_USER':
        // Update Column 6 (Index 5) -> Status to 'approved'
        updateCell(usersSheet, req.id, 5, 'approved'); 
        result = { status: 'approved' };
        break;
      
      case 'UPDATE_USER_ROLE':
        // Update Column 8 (Index 7) -> Role
        updateCell(usersSheet, req.id, 7, req.role); 
        result = { status: 'updated' };
        break;

      case 'REJECT_USER':
        deleteRowById(usersSheet, req.id);
        result = { status: 'rejected' };
        break;

      // --- WISHLIST OPERATIONS ---
      case 'GET_WISHLIST':
         var mobile = String(req.mobile).replace(/\D/g, "");
         var allWishlist = getData(wishlistSheet);
         var userItems = allWishlist.filter(function(w) { 
           return String(w.userMobile).replace(/\D/g, "") === mobile; 
         });
         result = { items: userItems };
         break;

      case 'ADD_WISHLIST':
         var mobile = String(req.mobile).replace(/\D/g, "");
         var pid = req.productId;
         var wid = 'w_' + Math.floor(Math.random() * 100000);
         var allW = getData(wishlistSheet);
         var exists = allW.some(function(w) { 
           return String(w.userMobile).replace(/\D/g, "") === mobile && String(w.productId) === String(pid); 
         });
         if(!exists) {
            wishlistSheet.appendRow([wid, "'" + mobile, pid]);
         }
         result = { status: 'added' };
         break;

      case 'REMOVE_WISHLIST':
         var mobile = String(req.mobile).replace(/\D/g, "");
         var pid = String(req.productId);
         var wData = wishlistSheet.getDataRange().getValues();
         for (var i = wData.length - 1; i >= 1; i--) {
            var rowMobile = String(wData[i][1]).replace(/\D/g, "");
            var rowPid = String(wData[i][2]);
            if (rowMobile === mobile && rowPid === pid) {
               wishlistSheet.deleteRow(i + 1);
            }
         }
         result = { status: 'removed' };
         break;

      // --- ORDER OPERATIONS ---
      case 'GET_ORDER_STATUS':
         var oid = String(req.orderId).trim();
         var orders = getData(ordersSheet);
         var order = orders.find(function(o) { return String(o.id).trim() === oid; });
         if (order) {
            result = { found: true, order: order };
         } else {
            result = { found: false };
         }
         break;

      case 'ADD_ORDER':
         var o = req.data;
         var newOid = 'ord_' + Math.floor(Math.random() * 100000);
         var dateStr = o.date ? "'" + o.date : "'" + new Date().toLocaleDateString('en-GB');
         var cleanMobile = String(o.userMobile).replace(/\D/g, "");
         ordersSheet.appendRow([newOid, "'" + cleanMobile, o.items, o.totalAmount, o.status, dateStr]);
         result = { status: 'added', id: newOid };
         break;

      case 'UPDATE_ORDER':
         var o = req.data;
         var oData = ordersSheet.getDataRange().getValues();
         var oFound = false;
         for (var i = 1; i < oData.length; i++) {
           if (String(oData[i][0]) === String(o.id)) {
             var dateVal = o.date ? "'" + o.date : "'" + new Date().toLocaleDateString('en-GB');
             var cleanMobile = String(o.userMobile).replace(/\D/g, "");
             ordersSheet.getRange(i + 1, 2, 1, 5).setValues([["'" + cleanMobile, o.items, o.totalAmount, o.status, dateVal]]);
             oFound = true;
             break;
           }
         }
         if (!oFound) throw new Error('Order ID not found');
         result = { status: 'updated' };
         break;

      case 'DELETE_ORDER':
         deleteRowById(ordersSheet, req.id);
         result = { status: 'deleted' };
         break;

      default:
        throw new Error('Unknown Action: ' + action);
    }

    return createResponse({ result: 'success', data: result });

  } catch (e) {
    return createResponse({ result: 'error', error: e.toString() });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return createResponse({ result: 'success', status: 'online', message: 'DB Connected' });
}

// --- HELPERS ---

function getSheet(doc, name, headers) {
  var sheet = doc.getSheetByName(name);
  if (!sheet) {
    sheet = doc.insertSheet(name);
    sheet.appendRow(headers);
  }
  return sheet;
}

function getData(sheet) {
  var data = sheet.getDataRange().getValues();
  var headers = data[0].map(function(h) { return String(h).toLowerCase().trim(); }); // Normalize headers
  var results = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      var headerName = headers[j];
      var val = row[j];
      
      // Map simplified headers back to key names if needed
      if (headerName === 'mobile' || headerName === 'usermobile') {
         val = String(val).replace(/['"]/g,"").trim(); 
         headerName = headerName === 'usermobile' ? 'userMobile' : 'mobile';
      }
      if (headerName === 'totalamount') headerName = 'totalAmount';
      
      obj[headerName] = val;
    }
    if (!obj['role'] && sheet.getName() === 'Users') obj['role'] = 'farmer';
    results.push(obj);
  }
  return results;
}

// Robust Cell Update - Finds ID ignoring format/spaces
function updateCell(sheet, id, colIndex, value) {
  var idStr = String(id).trim().replace(/['"]/g, "");
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    // Robust comparison
    var rowId = String(data[i][0]).trim().replace(/['"]/g, "");
    if (rowId === idStr) {
      sheet.getRange(i + 1, colIndex + 1).setValue(value);
      return;
    }
  }
}

// Robust Delete - Finds ID ignoring format/spaces
function deleteRowById(sheet, id) {
  var idStr = String(id).trim().replace(/['"]/g, "");
  var data = sheet.getDataRange().getValues();
  for (var i = data.length - 1; i >= 1; i--) {
    var rowId = String(data[i][0]).trim().replace(/['"]/g, "");
    if (rowId === idStr) {
      sheet.deleteRow(i + 1);
      return;
    }
  }
  throw new Error('ID not found: ' + id);
}

function createResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
