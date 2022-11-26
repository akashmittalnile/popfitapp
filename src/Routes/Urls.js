import { Badge } from "react-native-elements";
const BaseUrl = 'https://dev.pop-fiit.com';
export const API = {
    LOGIN: BaseUrl + '/api/login',
    GET_PROFILE: BaseUrl + '/api/details',
    MOBILE_NO_VERIFY: BaseUrl + '/api/send_otp',
    FORGOT_PASSWORD: BaseUrl + '/api/forgetpassword',
    VERIFY_OTP: BaseUrl + "/api/verifyotp",
    SIGN_UP: BaseUrl + '/api/register',
    EMAIL_VERIFY: BaseUrl + '/api/email_verify',
    CHANGE_PSWD: BaseUrl + '/api/change_password',
    SIGIN_SELECT_STATE: BaseUrl + '/api/state',
    GET_COUNTRY: BaseUrl + '/api/country',
    SELECT_CITY: BaseUrl + '/api/city',
    HOME_PRODUCT_list: BaseUrl + '/api/home',
    CONTACT_US: BaseUrl + '/api/contact_us',
    SHOP_MAIN: BaseUrl + '/api/shop',
    TRAINING_WORKOUT_CATEGORY: BaseUrl + '/api/workout_category',
    TRAINING_SUB_CATERORY: BaseUrl + '/api/workout_subcategory',
    SUBSCRIPTION_PLAN: BaseUrl + '/api/subscription_plan',
    NEWS_LETTER_SUBSCRIPTION: BaseUrl + '/api/subscribe_to_newsletter',
    NEWSLETTER_UNSUBSCRIBE:BaseUrl+'/api/unsubscribeNewsletter',
    BLOG_MAIN_SCREEN: BaseUrl + '/api/blog',
    BLOG_DETAILS: BaseUrl + '/api/blog_details',
    BLOG_SUBCATEGORY: BaseUrl + '/api/get_blog_subcategory',
    STORE_PRODUCT_DETAIL: BaseUrl + '/api/product_details',
    PRODUCT_DETAILS_ADD_ITEM: BaseUrl + '/api/add_to_cart',
    PRODUCT_DETAILS_REMOVE_ITEM: BaseUrl + '/api/removecartlist',
    BLOG_LISTBLOG: BaseUrl + '/api/blog_list',
    MY_ORDER: BaseUrl + '/api/my_order',
    TERMS_CONDITION: BaseUrl + '/api/tc',
    CANCELLATION_POLICY: BaseUrl + '/api/cancel_rt_policy',
    ABOUT_US: BaseUrl + '/api/about_us',
    REFUND_POLICY: BaseUrl + '/api/refund_policy',
    SHIPPING_DETAILS: BaseUrl + '/api/shipping_detail',
    COUPON_LIST: BaseUrl + '/api/coupon_list',
    COUPON_REMOVE: BaseUrl + '/api/remove_coupon',
    COUPON_APPLYED: BaseUrl + '/api/applyed_coupon',
    ORDER_DETAIL: BaseUrl + '/api/order_detail',
    CANCEL_ORDER:BaseUrl + '/api/cancelOrder',
    SET_TRAINING: BaseUrl + '/api/set_training',
    // SEARCH_ORDER_FILTER: BaseUrl + '/api/order_filter',
    SHIPPING_ADDRESS_ADD: BaseUrl + '/api/add_shipping_address',
    SEND_COMMENTS: BaseUrl + '/api/send_comment',
    TRAINING_LIST: BaseUrl + '/api/training_list',
    TRAINING_LIST_DETAILS: BaseUrl + '/api/training_detail',
    RECIPE_CATEGORY: BaseUrl + '/api/recipe_category',
    RECIPE_LIST: BaseUrl + '/api/recipe_list',
    RECIPE_DETAILS: BaseUrl + '/api/recipe_details',
    PROFILE_UPDATE: BaseUrl + '/api/update_profile',
    SHOP_FILTER: BaseUrl + '/api/filter',
    SHOP_CATEGORY: BaseUrl + '/api/shop_category',
    SHOP_PRODUCTLIST: BaseUrl + '/api/shop_productlist',
    NOTIFICATION_DETAILS: BaseUrl + '/api/notifications_detail',
    //  vrinda api integrations
    DELETE_ITEM: BaseUrl + '/api/delete_shipping_address',
    UPDATE_ITEM: BaseUrl + '/api/update_shipping_address',
    NOTIFICATION: BaseUrl + '/api/notifications',
    NOTIFICATION_DELETE: BaseUrl + '/api/delete_notification',
    STRIPE_PAYMENT: BaseUrl + '/api/stripePost',
    ORDER_PLACED: BaseUrl + '/api/save_order',
    INVOICE:BaseUrl + '/api/download_invoice',
    CANCEL_SUBSCRIPTION:BaseUrl + '/api/cancel_subscription'

}
