import { Access } from "./access";
import { Resource } from "./resource";
import { UserResourceAccess } from "./userResourceAccess";

export default class Users{
    id;
    username;
    password;
    name;
    lastname;
    email;
    loginDate;
    enabled;
    docId;
    usersFeesList;
    companiesList;
    ordersList;
    idRoles;
    userStatus;
    usersMobileList;
    rollingDays;
    urlResponse;
    urlResponseRefund;
    trysLogin;
    failLoginDate;
    doubleVerification;
    subUsersList;
    idMerchant;
    poolTpvsList;
    apiKey;
    secretKey;
    shieldApp;
    product;
    processor;
    securedAddress;
    securedEmail;
    securedPhone;
    securedName;
    securedUserPersonal;
    securedUserBank;
    securedUserFee;
    iban;
    swiftCode;
    theme;
    accountName;
    ifsc;
    taxId;
    webSite;
    amountLimit;
    hash;
    resourcesAccess;
    digitalSign;
    urlUser;
    transactionEcheckFee;
    billingName;

    convertInterfaceToClass(user) {

        let userToReturn = new Users();
        userToReturn.idRoles={};
        userToReturn.id = user.id;
        userToReturn.userStatus = user.userStatus;
        userToReturn.username = user.username;
        userToReturn.password = user.password;
        userToReturn.idRoles.id = user.idRoles.id;
        userToReturn.idRoles.name = user.idRoles.name;
        userToReturn.trysLogin = user.trysLogin;
        userToReturn.docId = user.docId;
        userToReturn.name = user.name;
        userToReturn.lastname = user.lastname;
        userToReturn.email = user.email;
        userToReturn.doubleVerification =
          user.doubleVerification;
        userToReturn.shieldApp = user.shieldApp;
        userToReturn.processor = user.processor;
        userToReturn.product = user.product;
        userToReturn.securedAddress = user.securedAddress;
        userToReturn.securedName = user.securedName;
        userToReturn.securedPhone = user.securedPhone;
        userToReturn.securedEmail = user.securedEmail;
        userToReturn.securedUserPersonal =
          user.securedUserPersonal;
        userToReturn.securedUserBank = user.securedUserBank;
        userToReturn.securedUserFee = user.securedUserFee;
        userToReturn.apiKey = user.apiKey;
        userToReturn.secretKey = user.secretKey;
        userToReturn.urlResponseRefund = user.urlResponseRefund;
        userToReturn.idMerchant = user.idMerchant;
        userToReturn.iban = user.iban;
        userToReturn.swiftCode = user.swiftCode;
        userToReturn.theme = user.theme;
        userToReturn.ifsc = user.ifsc;
        userToReturn.taxId = user.taxId;
        userToReturn.accountName = user.accountName;
        userToReturn.webSite = user.webSite;
        userToReturn.amountLimit = user.amountLimit;
        userToReturn.rollingDays = user.rollingDays;
        userToReturn.usersMobileList = user.usersMobileList;
        userToReturn.urlResponse = user.urlResponse;
        userToReturn.loginDate = user.loginDate;
        userToReturn.digitalSign = user.digitalSign;
        userToReturn.urlUser = user.urlUser;
        userToReturn.transactionEcheckFee =
          user.transactionEcheckFee;
        userToReturn.billingName = user.billingName;
    
        //ResourceAccess
        userToReturn.resourcesAccess = [];
        user.resourcesAccess.forEach((resourceAccess) => {
          let ura = new UserResourceAccess(
            resourceAccess.id,
            new Access(
              resourceAccess.idAccess.id,
              resourceAccess.idAccess.name
            ),
            new Resource(
              resourceAccess.idResource.id,
              resourceAccess.idResource.name
            )
          );
          userToReturn.resourcesAccess.push(ura);
        });
        return userToReturn;
      }

}