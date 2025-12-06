
import { Category, ShopCategory, VideoItem, Review } from './types';

export const COMPANY_NAME = "Arasupandian Farm Service";
export const COMPANY_NAME_TAMIL = "அரசுப்பாண்டியன்";
export const PHONE_NUMBER = "+919363734905";
export const DISPLAY_PHONE = "+91 93637 34905";
export const ADDRESS = "Ricemil Street, Chinnaovulapuram, Tamil Nadu – 625515"; // Main branch address
export const EMAIL = "afsofficial1990@gmail.com";
export const GST_NO = "33ERLPS6213K1ZE";
export const ESTABLISHED_DATE = "01-Apr-2013";
export const LOGO_URL = "https://scontent.fcjb6-1.fna.fbcdn.net/v/t39.30808-1/593950590_122197821806342710_366070744618605608_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=Cf9y-kAn-g0Q7kNvwFJMAD7&_nc_oc=AdmRFmZ_Cdx1WkDqESe02mMEyBMyKDeGf3qLagY2LG1M6yEW5dc1GXFSExxlIB-2lf4&_nc_zt=24&_nc_ht=scontent.fcjb6-1.fna&_nc_gid=09rFlcgt97mRqcTuLPkeIA&oh=00_Afmt-HykiSDiEztRLLx-0WISZ3uQMN7DXYt9Kys3H_WCyA&oe=69384633";

export const ADMIN_MOBILE = "7094826586";

// Google Apps Script Web App URL
export const GOOGLE_SHEET_API_URL = "https://script.google.com/macros/s/AKfycbxRxUHLu9xPJANJJkCuvMapWKPLOGwPvBkNs_E0obpXF6RrG0QkF6ief-AakrvHmyog/exec"; 

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61560281326623",
  instagram: "https://www.instagram.com/arasupandianfarm/",
  youtube: "https://www.youtube.com/@Arasupandianfarm1991"
};

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Banana', image: 'https://mrkagro.in/wp-content/uploads/2025/07/1-4.png' },
  { id: '2', name: 'Coconut', image: 'https://mrkagro.in/wp-content/uploads/2025/07/2-4.png' },
  { id: '3', name: 'Cardamom', image: 'https://mrkagro.in/wp-content/uploads/2025/07/3-4.png' },
  { id: '4', name: 'Grapes', image: 'https://mrkagro.in/wp-content/uploads/2025/07/4-3.png' },
  { id: '5', name: 'Vegetables', image: 'https://mrkagro.in/wp-content/uploads/2025/07/6-2.png' },
  { id: '6', name: 'Other Crops', image: 'https://mrkagro.in/wp-content/uploads/2025/07/5-2.png' },
];

export const SHOP_CATEGORIES: ShopCategory[] = [
  { id: 'sc1', name: 'Plant Food & Medicines', image: 'https://mrkagro.in/wp-content/uploads/2025/07/2-5.png' },
  { id: 'sc2', name: 'Organic Products', image: 'https://mrkagro.in/wp-content/uploads/2025/07/1-5.png' },
  { id: 'sc3', name: 'Biological Products', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=400&auto=format&fit=crop' },
];

export const VIDEOS: VideoItem[] = [
  { 
    id: 'v1', 
    title: 'Banana Yield Tips', 
    thumbnail: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=400&auto=format&fit=crop', 
    duration: 'Reel', 
    videoUrl: 'https://www.instagram.com/reel/DPWDpdoD-mh/' 
  },
  { 
    id: 'v2', 
    title: 'Pest Control Guide', 
    thumbnail: 'https://images.unsplash.com/photo-1599818815124-783a45199651?q=80&w=400&auto=format&fit=crop', 
    duration: 'Reel', 
    videoUrl: 'https://www.instagram.com/reel/DOnwNxYjxsA/' 
  },
  { 
    id: 'v3', 
    title: 'Coconut Maintenance', 
    thumbnail: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=400&auto=format&fit=crop', 
    duration: 'Reel', 
    videoUrl: 'https://www.instagram.com/reel/DLBtgmpInD0/' 
  },
  { 
    id: 'v4', 
    title: 'Organic Farming', 
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-581962374695?q=80&w=400&auto=format&fit=crop', 
    duration: 'Reel', 
    videoUrl: 'https://www.instagram.com/reel/DKLpwXyyth0/' 
  },
  { 
    id: 'v5', 
    title: 'New Fertilizers', 
    thumbnail: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=400&auto=format&fit=crop', 
    duration: 'Reel', 
    videoUrl: 'https://www.instagram.com/reel/DG4aQAUSzr8/' 
  },
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'பாண்டி',
    location: 'தேனி',
    rating: 5,
    text: '“வேகமான மற்றும் நம்பகமான சேவை!” டிராக்டர் பணிக்கு புக்கிங் செய்த உடனே பதில் வந்தது. நேரத்துக்கு வந்து வேலை சிறப்பாக முடித்தார்கள்.'
  },
  {
    id: 'r2',
    name: 'குமரவேல்',
    location: 'சின்னமனூர்',
    rating: 5,
    text: '“பீல்ட் அதிகாரி ரமேஷ் மிகவும் உதவித்தன்மை கொண்டவர்.” விவசாய நிலத்துக்கு வந்து மண் நிலையை பார்த்து சரியான உரம் பற்றி வழிகாட்டினார். மிகவும் நம்பகமான சேவை.'
  },
  {
    id: 'r3',
    name: 'சிவகுமார்',
    location: 'மதுரை',
    rating: 5,
    text: '“விலை விவசாயிக்கு பொருத்தமானது.” சேவை தரம் மிகச் சிறப்பு. பாரமான வேலைகளையும் நேரத்துக்குள் முடித்தார்கள்.'
  },
  {
    id: 'r4',
    name: 'முத்து',
    location: 'போடிநாயக்கனூர்',
    rating: 4,
    text: '“அற்புதமான கஸ்டமர் சப்போர்ட்.” WhatsApp-ல் புக் செய்தவுடனே ரெஸ்பான்ஸ். முழு செயல்முறையும் எளிது. நம்பகமானவர்கள்.'
  },
  {
    id: 'r5',
    name: 'அருண்',
    location: 'கம்பம்',
    rating: 5,
    text: '“ஒரே இடத்தில் அனைத்தும் கிடைக்கிறது.” டிராக்டர் சர்வீஸ், உரம் டெலிவரி, ஆலோசனை—எல்லாமே ஸ்மூத். நிச்சயம் பரிந்துரைக்கிறேன்.'
  }
];
