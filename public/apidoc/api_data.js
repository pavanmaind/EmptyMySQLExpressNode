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
    "groupTitle": "Contact",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/contact/addContact"
      }
    ]
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
    "groupTitle": "Contact",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/contact/deleteContact"
      }
    ]
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
    "groupTitle": "Contact",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/contact/updateContact"
      }
    ]
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
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/user/getUser"
      }
    ]
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
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/user/loginUser"
      }
    ]
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
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/user/registerUser"
      }
    ]
  }
] });
