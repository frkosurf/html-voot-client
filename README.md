# VOOT Demo Client

## Introduction

This application makes it possible to view VOOT group membership information.

![html-voot-client](https://github.com/fkooman/html-voot-client/raw/master/docs/html-voot-client-screenshot.png)

## Installation

This application depends on the following components:

* jQuery
* JSrender (JavaScript Template Rendering for jQuery)
* JSO (JavaScript OAuth 2 client)
* Bootstrap CSS 

It can easily be installed by running the following script:

    $ sh docs/install_dependencies.sh

This will download the latest version of those components and everything will
immediately work.

## Configuration
You need to configure the application to point to your OAuth server. This can
be done by copying `config/config.js.default` to `config/config.js` and 
modifying the `config.js` file to suit your situation.

This is the default configuration:

    var apiClientId = 'html-voot-client';
    var authorizeEndpoint = 'http://localhost/php-oauth/authorize.php';
    var apiEndpoint = 'http://localhost/php-voot-proxy/voot.php';

For example, for your situation it may need to be this:

    var apiClientId = 'html-voot-client';
    var authorizeEndpoint = 'https://www.example.org/php-oauth/authorize.php';
    var apiEndpoint = 'https://www.example.org/php-voot-proxy/voot.php';

## Client Registration
Also, make sure that this client is registered in your OAuth server. The following
information will be relevant:

<table>
  <tr>
    <th>Identifier</th><td>html-voot-client</td>
  </tr>
  <tr>
    <th>Name</th><td>View Your Group Membership</td>
  </tr>
  <tr>
    <th>Description</th><td>Application to view your group membership and other members of your groups.</td>
  </tr>
  <tr>
    <th>Profile</th><td>User-agent-based Application</td>
  </tr>
  <tr>
    <th>Secret</th><td><em>NONE</em></td>
  </tr>
  <tr>
    <th>Redirect URI</th><td>https://www.example.org/html-voot-client/index.html</td>
  </tr>
</table>

That should be all!
