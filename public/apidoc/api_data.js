define({ "api": [
  {
    "type": "post",
    "url": "/contact/addContact",
    "title": "Add Contact",
    "name": "addContact",
    "group": "Contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "number",
            "description": "<ul> <li>Contact Number</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "countryCode",
            "description": "<ul> <li>Country Code</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<ul> <li>Type</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "extension",
            "description": "<ul> <li>Extension</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<ul> <li>User Id</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\t\"number\": \"8754754124\",\n\t\t\"countryCode\": \"091\",\n\t\t\"type\": \"Home\",\n\t\t\"extension\": \"123\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Contact",
            "description": "<p>Details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Contact added successfully\",\n    \"responseData\": {\n        \"contactId\": 8,\n        \"contactNumber\": \"8754754124\",\n        \"type\": \"home\",\n        \"extension\": null,\n        \"countryCode\": \"091\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1006,\n    \"message\": \"Record already exists\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/contact/contactRoutes.js",
    "groupTitle": "Contact"
  },
  {
    "type": "post",
    "url": "/contact/deleteContact",
    "title": "Delete Contact",
    "name": "deleteContact",
    "group": "Contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactId",
            "description": "<ul> <li>Contact Id</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\t\"contactId\": \"8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Contact",
            "description": "<p>Details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Contact deleted successfully\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1007,\n    \"message\": \"No record exists\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/contact/contactRoutes.js",
    "groupTitle": "Contact"
  },
  {
    "type": "post",
    "url": "/contact/updateContact",
    "title": "Update Contact",
    "name": "updateContact",
    "group": "Contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "number",
            "description": "<ul> <li>Contact Number</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "countryCode",
            "description": "<ul> <li>Country Code</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<ul> <li>Type</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "extension",
            "description": "<ul> <li>Extension</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contactId",
            "description": "<ul> <li>Contact Id</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\t\"number\": \"9860157360\",\n\t\t\"countryCode\": \"091\",\n\t\t\"type\": \"Home\",\n\t\t\"extension\": \"123\",\n\t\t\"contactId\": \"8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Contact",
            "description": "<p>Details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Contact updated successfully\",\n    \"responseData\": {\n        \"contactId\": 8,\n        \"contactNumber\": \"9860157360\",\n        \"type\": \"home\",\n        \"extension\": null,\n        \"countryCode\": \"091\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1006,\n    \"message\": \"Record already exists\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/contact/contactRoutes.js",
    "groupTitle": "Contact"
  },
  {
    "type": "post",
    "url": "/user/bulkDeleteUsers",
    "title": "Bulk delete users",
    "name": "bulkDeleteUsers",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>Users unique access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": true,
            "field": "userData",
            "description": "<ul> <li>userData</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "[\n{\n\t\t\"userId\": 25\n},\n{\n\t\t\"userId\": 27\n}]",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Success",
            "description": "<p>Object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Success\",\n    \"responseData\": [\n        {\n            \"userId\": 25,\n            \"status\": \"No record exists\"\n        },\n        {\n            \"userId\": 27,\n            \"status\": \"Deleted Successfully\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1050,\n    \"message\": \"Invalid token\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/bulkInsertUsers",
    "title": "Bulk insert users",
    "name": "bulkInsertUsers",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>Users unique access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": true,
            "field": "userData",
            "description": "<ul> <li>userData</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "[{\n\t\t\"fullName\": \"Pavan Maind\",\n\t\t\"emailId\": \"pavanm@winjit.com\"\n},\n{\n\t\t\"fullName\": \"Himanshu Patel\",\n\t\t\"emailId\": \"hp@winjit.com\"\n}]",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Success",
            "description": "<p>Object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Success\",\n    \"responseData\": [\n        {\n            \"emailId\": \"pavanm@winjit.com\",\n            \"status\": \"Email Already Exists\"\n        },\n        {\n            \"emailId\": \"hp@winjit.com\",\n            \"status\": \"Success\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1050,\n    \"message\": \"Invalid token\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/bulkUpdateUsers",
    "title": "Bulk update users",
    "name": "bulkUpdateUsers",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>Users unique access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": true,
            "field": "userData",
            "description": "<ul> <li>userData</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "[{\n\t\t\"userId\": 23,\n\t\t\"fullName\": \"Danish Shaikh\"\n},\n{\n\t\t\"userId\": 26,\n\t\t\"fullName\": \"Amol Avhad\"\n}]",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Success",
            "description": "<p>Object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Success\",\n    \"responseData\": [\n        {\n            \"userId\": 23,\n            \"status\": \"No record exists\"\n        },\n        {\n            \"userId\": 26,\n            \"status\": \"Updated Successfully\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1050,\n    \"message\": \"Invalid token\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/getUser",
    "title": "Get User Details",
    "name": "getUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>Users unique access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Success\",\n    \"responseData\": {\n        \"userId\": 13,\n        \"fullName\": \"Pavan Maind\",\n        \"emailId\": \"akshayj@winjit.com\",\n        \"contactInfo\": [\n            {\n                \"contactId\": 3,\n                \"contactNumber\": \"8766978804\",\n                \"countryCode\": \"091\",\n                \"extension\": null,\n                \"type\": \"home\"\n            },\n            {\n                \"contactId\": 6,\n                \"contactNumber\": \"8983175362\",\n                \"countryCode\": \"091\",\n                \"extension\": null,\n                \"type\": \"home\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1003,\n    \"message\": \"Please check username or password\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/getUserDataByToken",
    "title": "Get User Details By Token",
    "name": "getUserDataByToken",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>Users unique access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"message\": \"Success\",\n    \"responseData\": {\n        \"emailId\": \"danish@winjit.com\",\n        \"fullName\": \"Danish S\",\n        \"userId\": 49,\n        \"imageId\": 6,\n        \"imageName\": \"1553151075035_me.jpg\",\n        \"fileType\": \"image/jpeg\",\n        \"imageNameOriginal\": \"me.jpg\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1003,\n    \"message\": \"Please check username or password\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/getUsersList",
    "title": "Get Users",
    "name": "getUsersList",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>Users unique access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "skip",
            "description": "<ul> <li>skip</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "take",
            "description": "<ul> <li>take</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "order_by",
            "description": "<ul> <li>Object {</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "selector",
            "description": "<ul> <li>selector</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "desc",
            "description": "<ul> <li>desc }</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": true,
            "field": "search_by",
            "description": "<ul> <li>search_by</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"skip\": 0,\n    \"take\": 50,\n    \"order_by\": {\n        \"selector\": \"userId\",\n        \"desc\": false\n    },\n    \"search_by\": [\n        {\n            \"userId\": 14\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>'s list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Success\",\n    \"responseData\": {\n        \"count\": 1,\n        \"data\": [\n            {\n                \"userId\": 14,\n                \"emailId\": \"kirti@winjit.com\",\n                \"fullName\": \"Pavan Maind\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1050,\n    \"message\": \"Invalid token\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/loginUser",
    "title": "Login User",
    "name": "loginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<ul> <li>Email Id</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<ul> <li>Password</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\t\"emailId\": \"pavanm@winjit.com\",\n\t\t\"password\": \"winjit\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>Login details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Login successful\",\n    \"responseData\": {\n        \"fullName\": \"Pavan Maind\",\n        \"emailId\": \"pavanm@winjit.com\",\n        \"userId\": 10,\n        \"token\": \"eyJhbGciOiJIUzIrfe5sInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoicGF2YW5tQHdpbmppdC5jb20iLCJmdWxsTmFtZSI6IlBhdmFuIE1haW5kIiwidXNlcklkIjoxMCwiaWF0IjoxNTUxODUyOTA0LCJleHAiOjE1ODMzODg5MDR9.PEZINRsYtCd6RW8kS2fRLSovvh5ZMLh4zngo7rEsqcs\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1003,\n    \"message\": \"Please check username or password\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/registerUser",
    "title": "Register User",
    "name": "registerUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<ul> <li>Full Name</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<ul> <li>Email Id</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<ul> <li>Password</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\t\"fullName\": \"Pavan Maind\",\n\t\t\"emailId\": \"himanshup@winjit.com\",\n\t\t\"password\": \"winjit\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>Registered details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Success\",\n    \"responseData\": {\n        \"emailId\": \"himanshup@winjit.com\",\n        \"userId\": 15\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "   HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1004,\n    \"message\": \"Email Already Exists\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/uploadProfilePic",
    "title": "Upload Profile Picture",
    "name": "uploadProfilePic",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>Users unique access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "profilePic",
            "description": "<ul> <li>profilePic</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Success",
            "description": "<p>Object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Bad",
            "description": "<p>Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 500 UNAUTHORIZED\n{\n    \"status\": 1050,\n    \"message\": \"Invalid token\",\n    \"responseData\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "modules/user/userRoutes.js",
    "groupTitle": "User"
  }
] });
