export const LOGIN_RESULT = {
    "LOGGED" : '0',
    "DOUBLE_FACTOR" : '1',
    "BANNED" : '-1',
    "TRYS_EXCEEDED" : '-2',
    "EXPIRED_PASSWORD" : '-3',
    "RESETED_PASSWORD" : '-4',
    "TEMP_BANNED" : '-5',
    "FAILED_DOUBLE_VERIFICATION_PROCCEES": '-6'
  }

  export const NotificationType= {
    Success : 'Success',
    Error : 'Error',
    Info : 'Info',
    Warning : 'Warning',
    Confirm:'Confirm',
    Delete:'Delete',
    AccessDenied:'Access Denied',
    Logout:'Logout'
  }
  export const ROLES= {
    ROLE_ADMIN : 1,
    ROLE_COMPANY : 3,
    ROLE_MERCHANT : 13,
    ROLE_SUBUSER : 14,
    ROLE_BILLING : 15,
    ROLE_SUPERADMIN : 16
  }
  export const ACCESSES= {
    ACCESS_NONE : 0,
    ACCESS_READ: 1,
    ACCESS_WRITE : 2
  }