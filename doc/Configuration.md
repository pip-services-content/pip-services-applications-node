# Configuration Guide <br/> Applications Microservice

Configuration structure used by this module follows the 
[standard configuration](https://github.com/pip-services/pip-services/blob/master/usage/Configuration.md) 
structure.

Example **config.yaml** file:

```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "pip-services-applications"
  description: "Applications microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "pip-services-applications:persistence:file:default:1.0"
  path: "./data/applications.json"

- descriptor: "pip-services-applications:controller:default:default:1.0"

- descriptor: "pip-services-applications:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 3000
```
