9/4/24 I learned how to connect GitHub and VS code.
You can find more information in the [Go to README](./README.md).

10/16/24, Information for Midterm 1 study guide:
1. **What does the `link` element do?**
   * The `<link>` element is used in HTML to link external resources, like stylesheets, to an HTML document. It is most commonly used to include CSS files. The syntax looks like this:
      ```html
      <link rel="stylesheet" href="styles.css">
   * rel="stylesheet" specifies the relationship between the HTML document and the linked file.
   * href="styles.css" indicates the path to the CSS file.
   * The link element is typically placed inside the <head> section of an HTML document and doesn't produce any visual content on the page itself.

2. What does a div tag do?

  * The `<div>` tag is a block-level element used to group together HTML elements, acting as a container for other content. It does not have any semantic meaning on its own but is commonly used to structure and style sections of a webpage using CSS. For example:
      ```html
      <div class="container">
          <p>This is some text inside a div.</p>
      </div>
  * This div can then be styled or manipulated using CSS or JavaScript.
### In the following code, what is the difference between the `#title` and `.grid` selector?

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        #title {
            font-size: 24px;
            color: blue;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }
    </style>
    <title>Selectors Example</title>
</head>
<body>
    <h1 id="title">Welcome to My Webpage</h1>
    <div class="grid">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
    </div>
</body>
</html>
