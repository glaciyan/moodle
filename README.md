# Moodle Shortcuts

## Add Custom Links or Lists
To add a custom list open your developer console and run `setCustomCourseList` with the JSON string you want to use.

For example:
```js
setCustomCourseList('[{"name":"test", "id": 1}]')
```

To set a custom link to fetch run `setCustomCourseLink` with a string of the link you want to fetch.
**Make sure the CORS policy works.**

For example:
```js
setCustomCourseLink("https://www.example.com")
```
