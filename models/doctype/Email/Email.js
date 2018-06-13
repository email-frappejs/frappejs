module.exports = {
    "name": "Email",
    "doctype": "DocType",
    "isSingle": 0,
    "isChild": 0,
    "keywordFields": [
        "name",
        "from_emailAddress"
    ],
    "fields": [
        {
            "fieldname": "name",
            "label": "Name",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "from_emailAddress",
            "label": "Email",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "password",
            "label": "Password",
            "fieldtype": "Data",
            "required": 1,
            // "hidden": 1, uncomment when s: OAuth
        },
        {
            "fieldname": "host",
            "label": "Host",
            "fieldtype": "Link",
            "required": 1
        },
        {
            "fieldname": "port",
            "label": "Port",
            "fieldtype": "Int",
            "required": 1
        },
        {
            "fieldname": "clientId",
            "label": "Client Id",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "clientSecret",
            "label": "Client Secret",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "refreshToken",
            "label": "Refresh Token",
            "fieldtype": "Data",
            "required": 1
        }
    
    ]
}
