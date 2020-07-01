# SwaggerHub Linter Browser Extension

<img src="icon.png" height="150px" width="150px"/>

The SwaggerHub Browser Extension is a project which will be undertaken to allow users of the extension to apply their own rules to an API - this will be used to provide an external linting service to maintain the integrity of the SwaggerHub OpenAPI YAML file.

The way in which this would work is by the YAML file being exported and executed in the back-end before the Chrome extension will extract the relevant data and render the results in a web page.

Doing so will allow for the users of the extension to be able to enforce their own rules and ensure compliance as per 8x8's guidance. These REST API Standards and guidelines are detailed [here](https://confluence.8x8.com:8443/display/CCE/VCC+Rest+API+Standards).
The project will be phased gradually following milestones to be met to ensure that each component of the extension is compliant and can be accessed and utilised by its users.

The milestone plan is as follows:

* [X] VCC-38807   Get to know how Chrome extension work
* [X] VCC-38808	Create a GitLab repo with supporting documentation
* [X] VCC-38809	Create a simple Chrome extension - phase 1
* [ ] VCC-38810	Create a simple Chrome extension - phase 2
* [X] VCC-38811	Define in SwaggerHub a new API for an OpenAPI linter service
* [ ] VCC-38812	Implement the linter API in a Cloud8 service
* [ ] VCC-38813	Add simple linter rules for specification completeness
* [ ] VCC-38814	Extend the linter rules to cover more of the 8x8 guidance