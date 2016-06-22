# Atlas-Angular

Angular modules that help with the AtlasNet Standard

### atlas.angular.filters

`Directive` dateFilter: Parses a string to a supplied date format

#### Usage

Add module to the app bootstrap
```javascript
angular.module(appName, ['atlas.angular', 'atlas.angular.filters']);
```

#### dateFilter
Inject to the controller and use as a method
```javascript
MyController.$inject = ['$scope', 'dateFilter'];

function MyController($scope, dateFilter) {
  var parsedDate = dateFilter(dateToParse, 'MM/dd/yyyy')
}
```

### atlas.angular.showErrors

`Directive` showErrors: Uses angular client side validation to show and style messages

#### Usage

Add module to the app bootstrap
```javascript
angular.module(appName, ['atlas.angular', 'atlas.angular.showErrors']);
```

##### showErrors
Use as an attribute on an `.input-group` in a `<form>`.

```html
<form name="vm.form.myForm" novalidate>
  <div class="row">
    <div class="col-sm-3">
      <div class="form-group" show-errors>
        <label class="control-label" for="id">ID</label>
        <input name="id" id="id" ng-model="vm.id" type="text" class="form-control" ng-required="true" />
        <em class="help-block small" ng-if="vm.form.myForm.id.$error.required" role="alert">An ID is required</em>
      </div>
    </div>
  </div>
</form>
```

### atlas.angular.navbar

`directive` atlasNav: Uses a template to create the AtlasNet Standard navbar

`directive` atlasCommandLeft: Uses a template to create a left aligned command bar

`directive` atlasCommandCenter: Uses a template to create a centered command bar

`directive` atlasCommandRight: Uses a template to create a right aligned command bar

`directive` atlasCommand: Uses a template to create a command

#### Usage

Add module to the app bootstrap
```javascript
angular.module(appName, ['atlas.angular', 'atlas.angular.navbar']);
```

##### atlasNav
Used as an element

Possible attributes

`username`: {string} username to be displayed in on the navigation

`showCommand`: {boolean} (default: false) if true, will show command bar

##### atlas-command-{left/center/right}
Used as an element. Must be a child of an `atlas-nav` element

NOTE: Left/Right can be used together. Center must be used alone.

##### atlas-command
Used as an element. Must be a child of an `atlas-command-{left/center/right}` element

Possible attributes

`title`: {string} Title to be shown on the hover event (tooltip)

`icon`: {string} Font-Awesome icon

`clickEvent`: {method} ng-click of the link, method should be in the page controller

`text`: {string} Text to be shown

```html
<div class="navbar-fixed-top" ng-if="vm.authorization.firstLastName">
  <atlas-nav username="vm.authorization.firstLastName" show-command="true">
    <atlas-command-right>
      <atlas-command title="Reset" icon="eraser" click-event="vm.reset()" text="Reset"></atlas-command>
      <atlas-command title="Get ID Info" icon="info-circle" click-event="vm.submit(vm.form.myForm.$valid, true)" text="Get ID Info"></atlas-command>
      <atlas-command title="Submit" icon="arrow-circle-right" click-event="vm.submit(vm.form.myForm.$valid, false)" text="Submit"></atlas-command>
    </atlas-command-right>
  </atlas-nav>
</div>
```
