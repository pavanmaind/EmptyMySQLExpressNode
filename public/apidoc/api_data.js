define({ "api": [
  {
    "type": "post",
    "url": "/user/loginUser",
    "title": "Login User",
    "name": "Login_User",
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
            "description": "<ul> <li>Password { &quot;emailId&quot;: &quot;pavanm@winjit.com&quot;, &quot;password&quot;: &quot;winjit&quot; }</li> </ul>"
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
            "description": "<p>Login details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n   \"status\": 200,\n   \"message\": \"Success\",\n   \"responseData\": {\n       \"fullName\": \"Pavan Maind\",\n       \"emailId\": \"janvi@winjit.com\",\n       \"userId\": 2\n   }\n}",
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
    "name": "Register_User",
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
            "description": "<ul> <li>Password { &quot;fullName&quot;: &quot;Pavan Maind&quot;, &quot;emailId&quot;: &quot;pavanm@winjit.com&quot;, &quot;password&quot;: &quot;winjit&quot; }</li> </ul>"
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
            "description": "<p>Registered details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n   \"status\": 200,\n   \"message\": \"Success\",\n   \"responseData\": {\n       \"emailId\": \"janvi@winjit.com\",\n       \"userId\": 2\n   }\n}",
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