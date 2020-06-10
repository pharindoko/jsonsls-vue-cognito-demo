Ziel:

- software as a service
- multitenant platform
- Aus existierenden Json files/ strings möglichst einfach Rest / Graphql APIs generieren - erstmal basierend auf dem json-server format. (siehe jsonschema)
- Website + API first (danach eine CLI zum Management der einzelnen APIs)

Backend:

- AuthN:
  - Erstmal mit Cognito User Pool
  - Am besten mit Passport (später gut für weitere Authprovider z.B. apitoken, github, etc.)
- Erstmal wie bereits bestehend Jsonserver als Bestandteil der CoreApp für das Routing
- Neuer Storageadapter für die LowDB:
  - DynamoDB - Stacktable for JSONString, Appconfig
  - User / Stack Relation Table
- Middleware zum Abfragen und unterscheiden der Tenants und prüfen der Userberechtigung
- Für jeden einzelnen Request (aufgrund der dynamischen Unterscheidung der Tenants) zumindest jetzt on the fly jedesmal die Erstellung der Interfaces / Update des Storageadapters nötig. (Für den ersten Entwurf vollkommen ok - aber die Performance wird leiden.)
  => core.setup()
- Management-Api / Layer benötigt damit der User seine Apis verwalten kann.
  -> jeder User kann mehrere Apis erstellen und auch als Admin verwalten
- Simples Rollen/Permissionmodel (ADMIN und USER)
  -> Admin kann assignen welche HTTPVERBS pro Stack von den Usern ausgeführt werden dürfen (POST; PUT; PATCH; GET; DELETE)

Frontend:

- User kann json validieren (jsonschema bereits vorhanden) bzw. später autofixen (soweit es geht)

- User muss account erstellen/ registrieren (erstmal simple mit Cognito)
  - Register Form
  - Login Form
- Management-Api
  - List all Apis
  - Create Api
  - Read/Update Api -> Apisettings einstellen (Readonly, Authentication, Interfaces (swagger, graphql))
  - Delete Api
  - User hinzufügen / einladen

Website:

    Welchen domainnamen ?
    Vorschlag:
    - json-serverless.io
    - json-serverless.com
    - pharin.io
    gerne weiter vorschläge

    GDPR:
    - Keine Datenanalyse/- weiterverarbeitung vorgesehen
    - Beim Löschen Daten des Users komplett löschen
