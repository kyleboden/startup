9/4/24 I learned how to connect GitHub and VS code.
You can find more information in the [Go to README](./README.md).

10/16/24, Information for Midterm 1 study guide:
1. **What does the `link` element do?**
   * The `<link>` element is used in HTML to link external resources, like stylesheets, to an HTML document. It is most commonly used to include CSS files. The syntax looks like this:
      ```html
      <link rel="stylesheet" href="styles.css">
      ```
   * `rel="stylesheet"` specifies the relationship between the HTML document and the linked file.
   * `href="styles.css"` indicates the path to the CSS file.
   * The link element is typically placed inside the `<head>` section of an HTML document and doesn't produce any visual content on the page itself.

2. **What does a div tag do?**
   * The `<div>` tag is a block-level element used to group together HTML elements, acting as a container for other content. It does not have any semantic meaning on its own but is commonly used to structure and style sections of a webpage using CSS. For example:
      ```html
      <div class="container">
          <p>This is some text inside a div.</p>
      </div>
      ```
   * This div can then be styled or manipulated using CSS or JavaScript.

3. **In the following code, what is the difference between the `#title` and `.grid` selector?**

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
    ```

   **Explanation:**
   * `#title` is an ID selector:
     * It selects the element with the ID attribute `title`.
     * IDs must be unique within a webpage, so only one element should have this ID.
     * In the example, it targets the `<h1>` element with `id="title"` and sets its font size to 24px and its color to blue.
   
   * `.grid` is a class selector:
     * It selects all elements with the class attribute `grid`.
     * Classes can be reused across multiple elements on the page.
     * In the example, it targets the `<div>` with `class="grid"`, applying a grid layout with 3 columns and a gap of 10px between grid items.
   
   **Summary:**
   * **ID Selector (`#title`)**: Targets a single, unique element. Should be used for elements that appear only once on a page.
   * **Class Selector (`.grid`)**: Can target multiple elements. It's useful for applying styles to multiple elements that share the same class.
   
4. **In the following code, what is the difference between padding and margin?**

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            .box {
                width: 200px;
                height: 100px;
                background-color: lightblue;
                padding: 20px;
                margin: 30px;
                border: 2px solid blue;
            }
        </style>
        <title>Padding vs. Margin</title>
    </head>
    <body>
        <div class="box">This is a box.</div>
    </body>
    </html>
    ```

   * **Padding** is the space inside an element, between its content and its border.
     * In the example above, the `padding: 20px;` adds 20 pixels of space inside the `.box` element, between the content ("This is a box.") and its border.
     * This increases the size of the element because it pushes the border outward.
  
   * **Margin** is the space outside an element, creating distance between the element’s border and other surrounding elements.
     * In the example above, the `margin: 30px;` adds 30 pixels of space outside the `.box` element, separating it from other elements or the edge of the browser window.
     * Margin does not affect the size of the element itself; it just adds space around it.

   * **Summary**:
     * **Padding**: Space inside the element, between the content and the border.
     * **Margin**: Space outside the element, creating distance between it and other elements or the page boundary.

5. **Given this HTML and this CSS, how will the images be displayed using flex?**

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            .image-container {
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 300px;
                border: 2px solid black;
            }
    
            .image-container img {
                width: 100px;
                height: auto;
            }
        </style>
        <title>Flexbox Image Display</title>
    </head>
    <body>
        <div class="image-container">
            <img src="image1.jpg" alt="Image 1">
            <img src="image2.jpg" alt="Image 2">
            <img src="image3.jpg" alt="Image 3">
        </div>
    </body>
    </html>
    ```

   **Explanation**:
   * The `.image-container` element has `display: flex;`, which turns it into a flex container. This means all direct children of this container (the `<img>` elements) are treated as flex items.
   * `justify-content: space-around;` distributes the space around the images. Each image will have equal space on its left and right, creating separation between them within the container.
   * `align-items: center;` vertically centers the images within the height of the container, which is set to 300px.
   
   **Result**:
   * The images will be displayed in a row, as flex containers by default arrange their items in a horizontal line.
   * The images will be equally spaced apart due to `justify-content: space-around;`.
   * The images will be vertically centered within the container because of `align-items: center;`.

   **Summary**:
   * **Flex Direction**: The images are laid out in a row (default flex direction).
   * **Justification**: The images are spaced equally with space on both sides (space-around).
   * **Alignment**: The images are vertically centered within the container (center).

6. **What does the following padding CSS do?**

    ```css
    .container {
        padding: 10px 20px 30px 40px;
    }
    ```

   **Explanation**:
   * The padding values are applied in a clockwise order:
     * `10px` is the padding for the top of the element.
     * `20px` is the padding for the right side of the element.
     * `30px` is the padding for the bottom of the element.
     * `40px` is the padding for the left side of the element.
   * This shorthand format allows you to specify padding for all four sides of an element in one line. The result is that the element will have different amounts of space between its content and its border, depending on the side.

   **Summary**:
   * **Top padding**: 10px
   * **Right padding**: 20px
   * **Bottom padding**: 30px
   * **Left padding**: 40px

7. **What does the following code using arrow syntax function declaration do?**

    ```javascript
    const addNumbers = (a, b) => {
        return a + b;
    };
    
    // Example usage:
    console.log(addNumbers(3, 4)); // Outputs: 7
    ```

   **Explanation**:
   * The code defines a function called `addNumbers` using arrow function syntax.
   * `(a, b)` are the parameters for the function, and `=>` indicates that this is an arrow function.
   * The function returns the sum of `a` and `b`.
   * Arrow functions provide a shorter syntax for writing functions and also handle the `this` keyword differently compared to regular functions, often making them useful for inline functions or callbacks.

   **In this example**:
   * `addNumbers(3, 4)` will return `7` because it adds the two parameters `3` and `4`.

   **Summary**:
   * **Arrow Function**: A concise way to declare functions.
   * **Return Value**: The sum of `a` and `b`.
   * **Usage**: Useful for shorter, simpler functions or callbacks.

8. **What does the following code using `map` with an array output?**

    ```javascript
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(num => num * 2);
    
    console.log(doubled);
    ```

   **Explanation**:
   * The `map` function creates a new array by applying the provided function (`num => num * 2`) to each element in the `numbers` array.
   * Each element in the `numbers` array is multiplied by `2`, resulting in a new array.
   * Therefore, the original array `[1, 2, 3, 4, 5]` is transformed into a new array where each number is doubled: `[2, 4, 6, 8, 10]`.

9. **What does the following code output using `getElementById` and `addEventListener`?**

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Event Listener Example</title>
    </head>
    <body>
        <button id="myButton">Click Me!</button>
        <script>
            document.getElementById('myButton').addEventListener('click', () => {
                console.log('Button was clicked!');
            });
        </script>
    </body>
    </html>
    ```

   **Explanation**:
   * The code selects the button element with the ID `myButton` using `getElementById`.
   * It adds an event listener that listens for click events on the button.
   * When the button is clicked, the callback function executes and logs the message `Button was clicked!` to the console.

   **Output**:
   * When the button is clicked, the console will output: `Button was clicked!`
   * This means that the specified action (logging to the console) will occur every time the button is clicked.
   * 
10. **What does the following line of JavaScript do using a `#` selector?**

    ```javascript
    const element = document.querySelector('#myElement');
    ```

   **Explanation**:
   * The line of JavaScript uses the `document.querySelector()` method to select an element from the DOM.
   * The `#` selector indicates that it is targeting an element with the ID of `myElement`.
   * The `querySelector` method returns the first matching element it finds in the document.
   * If no element with that ID exists, `element` will be `null`.

   **Summary**:
   * **Purpose**: Selects the first element with the ID `myElement`.
   * **Method**: `querySelector` allows for CSS-style selectors.
   * **Result**: Returns the element or `null` if not found.

11. **Which of the following are true? (mark all that are true about the DOM)**

   - **True**: The DOM represents the structure of an HTML document as a tree of objects.
   - **True**: The DOM allows programming languages to manipulate the structure, style, and content of web pages.
   - **True**: The DOM is language-independent and can be used with various programming languages.
   - **False**: The DOM is only accessible through JavaScript. *(While JavaScript is the most common language used to interact with the DOM, other languages can also manipulate it through various means, such as WebAssembly or server-side languages in specific contexts.)*

   **Summary**:
   * The DOM is a powerful representation of the web page structure that allows for dynamic manipulation and interaction across different programming languages.

12. **By default, the HTML `<span>` element has a default CSS display property value of:**

    ```css
    display: inline;
    ```

   **Explanation**:
   * **Inline Element**: The `<span>` element is an inline element, meaning it does not start on a new line and only takes up as much width as necessary.
   * **Purpose**: The `<span>` element is typically used to apply styles or manipulate small portions of text without affecting the surrounding content layout.

     **Example**:
     ```html
     <p>This is a <span style="color: red;">red</span> word in a paragraph.</p>
In this example, the word "red" is styled with a different color without disrupting the flow of the paragraph.
  
13. **How would you use CSS to change all the `<div>` elements to have a background color of red?**

    ```css
    div {
        background-color: red;
    }
    ```

14. **How would you display an image with a hyperlink in HTML?**

   To display an image with a hyperlink in HTML, you can use the `<a>` (anchor) element to wrap the `<img>` (image) element. Here’s how you can do it:

   **Example Code:**

    ```html
    <a href="https://www.example.com">
        <img src="image.jpg" alt="Description of Image" />
    </a>
    ```

   **Explanation**:
   - The `<a>` element creates a hyperlink to the URL specified in the `href` attribute.
   - The `<img>` element is nested inside the `<a>` element, making the image clickable.
   - The `src` attribute specifies the path to the image file.
   - The `alt` attribute provides alternative text for the image, which is important for accessibility and displays if the image cannot be loaded.
   - When a user clicks on the image, they will be directed to `https://www.example.com`.

15. **In the CSS box model, what is the ordering of the box layers starting from the inside and working out?**

   In the CSS box model, the ordering of the box layers from the inside to the outside is as follows:

   1. **Content**: The innermost part that holds the actual content, such as text, images, etc.
   2. **Padding**: The space between the content and the border. It creates space inside the box and does not have a background color.
   3. **Border**: A line surrounding the padding (if any) and the content. It can have width, style, and color.
   4. **Margin**: The outermost layer that creates space outside the border, separating the element from other elements.

   **Visual Representation**:

      +------------------------+
      |        Margin          |
      |  +------------------+  |
      |  |      Border      |  |
      |  |  +-----------+   |  |
      |  |  |  Padding  |   |  |
      |  |  | +-------+ |   |  |
      |  |  | |Content | |   |  |
      |  |  | +-------+ |   |  |
      |  |  +-----------+   |  |
      |  +------------------+  |
      +------------------------+


16. **Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?**

   #### Example HTML:

    ```html
    <p>This is some text with the word <span class="highlight">trouble</span> and the word double.</p>
    ```

   **CSS to Set "trouble" to Green**:

   To set the text "trouble" to green while leaving "double" unaffected, you can target the `<span>` element with the class `.highlight` in your CSS:

    ```css
    .highlight {
        color: green;
    }
    ```

   **Explanation**:
   - The `<span>` element wrapping "trouble" has a class named `highlight`.
   - The CSS rule targets that class and sets the `color` property to green.
   - As a result, only the text "trouble" will be displayed in green, while "double" remains unaffected.


  
17. **What will the following code output when executed using a for loop and console.log?**

    ```javascript
    for (let i = 0; i < 5; i++) {
        console.log(i);
    }
    ```

   The for loop initializes a variable `i` to 0 and increments `i` by 1 after each iteration. The loop continues as long as `i` is less than 5. `console.log(i)` outputs the current value of `i` during each iteration.

   **Output:**
      0
      1
      2
      3
      4
    This means that the numbers 0 through 4 will be printed to the console, each on a new line.

18. **How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?**

   To select an element with the ID of `byu` and change its text color to green using JavaScript, you can use the `document.getElementById()` method. Here’s how you can do it:

     ```html
     <p id="byu">This is a paragraph with the ID "byu".</p>
     
     <script>
         const element = document.getElementById('byu');
         element.style.color = 'green';
     </script>

  Explanation:
  The <p> element has an ID of byu.
  document.getElementById('byu') selects the element with that ID.
  The style.color property is then set to 'green', changing the text color of that element.

19. **What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, and third level heading?**

   Here are the opening HTML tags for the requested elements:

   - **Paragraph:** `<p>`
   - **Ordered List:** `<ol>`
   - **Unordered List:** `<ul>`
   - **Second Level Heading:** `<h2>`
   - **First Level Heading:** `<h1>`
   - **Third Level Heading:** `<h3>`

   **Example:**
     ```html
     <p>This is a paragraph.</p>
     <ol>
         <li>First item</li>
         <li>Second item</li>
     </ol>
     <ul>
         <li>Bullet item</li>
         <li>Another bullet item</li>
     </ul>
     <h1>This is a first level heading</h1>
     <h2>This is a second level heading</h2>
     <h3>This is a third level heading</h3>

   These tags define the structure and hierarchy of content in an HTML document.

20. **How do you declare the document type to be HTML?**

   To declare the document type as HTML, you use the `<!DOCTYPE>` declaration at the very beginning of your HTML document. This informs the browser about the version of HTML being used.

   **Example:**
     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Document Type Declaration</title>
     </head>
     <body>
         <p>This is an example HTML document.</p>
     </body>
     </html>


21. What is valid javascript syntax for if, else, for, while, switch statements?
     ```javascript
    if (condition) {
    // code to execute if condition is true
    } else {
        // code to execute if condition is false
    }
     
    for (let i = 0; i < 5; i++) {
        console.log(i);
    }
     
    let i = 0;
    while (i < 5) {
        console.log(i);
        i++;
    }
     
    switch (expression) {
        case value1:
            // code to execute if expression equals value1
            break;
        case value2:
            // code to execute if expression equals value2
            break;
        default:
            // code to execute if expression does not match any case
    }

22. What is the correct syntax for creating a JavaScript object?
    
    The correct syntax for creating a JavaScript object is to use either an object literal or the `new Object()` constructor. The most common way is using an object literal.
#### Example Code (Object Literal):

        ```javascript
        const person = {
            name: "John Doe",
            age: 30,
            job: "Developer",
            greet: function() {
                console.log("Hello, my name is " + this.name);
            }
        };
  
      // USING new Object()
      const person = new Object();
      person.name = "John Doe";
      person.age = 30;
      person.job = "Developer";
      person.greet = function() {
          console.log("Hello, my name is " + this.name);
      };
  Object Literal: This is the most concise way to create an object, where you define key-value pairs within curly braces.
  Using new Object(): This method allows you to create an object instance, but it is less commonly used compared to the object literal syntax.


23. Is it possible to add new properties to JavaScript objects?
  Yes, it is possible to add new properties to JavaScript objects at any time, even after the object has been created.
    const car = {
        make: "Toyota",
        model: "Camry"
    };
    
    // Adding a new property
    car.year = 2021;
    
    console.log(car);


24. If you want to include JavaScript on an HTML page, which tag do you use? 

      To include JavaScript on an HTML page, you use the `<script>` tag.

      #### Example Code:
      
      ```html
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Include JavaScript</title>
      </head>
      <body>
          <p id="animal">fish</p>
      
          <script>
              // JavaScript code can be included here
              console.log("JavaScript is included!");
          </script>
      </body>
      </html>
  
  The <script> tag can be placed either in the <head> or <body> sections of an HTML document.
  You can include JavaScript code directly within the <script> tag or link to an external JavaScript file using the src attribute (e.g., <script src="script.js"></script>).


25. Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?

      ```html
      <p id="animal">fish</p>
      <p>fish</p>

  JavaScript Code to Change "animal" to "crow":

      document.getElementById('animal').innerText = 'crow';
  The JavaScript code uses document.getElementById('animal') to select the <p> element with the ID animal.
  The innerText property is then set to 'crow', which changes the text content of that specific element to "crow" while leaving the other "fish" text unaffected.
  
26. Which of the following correctly describes JSON?

    JSON, which stands for JavaScript Object Notation, is a lightweight data interchange format that is easy for humans to read and write and easy for machines to parse and generate. It is often used to transmit data between a server and a web application.
    
    #### Key Features of JSON:
    
    - **Data Structure**: JSON is based on key-value pairs and is similar to JavaScript object literals. 
    - **Format**: It supports data types such as strings, numbers, arrays, booleans, and nested objects.
    - **File Extension**: JSON files typically use the `.json` extension.
    - **Language Independence**: Although JSON is derived from JavaScript, it is language-independent and can be used with many programming languages.
    
    #### Example JSON:
    
    ```json
    {
        "name": "John Doe",
        "age": 30,
        "isStudent": false,
        "courses": ["Math", "Science"],
        "address": {
            "street": "123 Main St",
            "city": "Anytown"
        }
    }

27. What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo do?
Here’s a brief description of each command:

    chmod: Changes the permissions of a file or directory.
    
    pwd: Prints the current working directory, showing the full path of where you are in the filesystem.
    
    cd: Changes the current directory to another directory. Usage: cd [directory_path].
    
    ls: Lists the files and directories in the current directory. Options can include -l for detailed listing and -a for hidden files.
    
    vim: Opens the Vim text editor for creating or editing files.
    
    nano: Opens the Nano text editor, which is more user-friendly compared to Vim.
    
    mkdir: Creates a new directory. Usage: mkdir [directory_name].
    
    mv: Moves or renames files or directories. Usage: mv [source] [destination].
    
    rm: Removes files or directories. Use with caution, especially with the -r option for recursive deletion.
    
    man: Displays the manual for a command, providing details about its usage. Usage: man [command].
    
    ssh: Securely connects to a remote machine over SSH (Secure Shell). Usage: ssh [user]@[hostname].
    
    ps: Displays the currently running processes. Options like aux can provide detailed information.
    
    wget: Downloads files from the web via HTTP, HTTPS, or FTP.
    
    sudo: Executes a command with superuser (administrative) privileges, allowing users to perform tasks that require elevated permissions.

        # Change directory
    cd /path/to/directory
    
    # List files
    ls -la
    
    # Create a new directory
    mkdir new_folder
    
    # Remove a file
    rm unwanted_file.txt
    
    # Download a file
    wget http://example.com/file.zip
    
    # Run a command with superuser privileges
    sudo apt update


### 28. Which of the following console commands creates a remote shell session?
    - **`ssh`** (Secure Shell) allows you to securely connect to a remote machine over a network. It provides a secure channel over an unsecured network by using encryption.


### 29. Which of the following is true when the -la parameter is specified for the ls console command?
  When the -la parameters are specified for the ls command, the following is true:
  
      -l: This option displays the contents of the directory in a detailed (long) format, which includes permissions, number of links, owner name, owner group, file size, and the timestamp of the last modification.
      
      -a: This option includes hidden files in the listing, which are files and directories that start with a dot (.).
    
    The command ls -la lists all files and directories, including hidden ones, in a detailed format, providing valuable information about each file and directory.


### 30. Which of the following is true for the domain name `banana.fruit.bozo.click`? 

  - **Top-Level Domain (TLD)**: The top-level domain is the last part of the domain name, which in this case is **`.click`**. TLDs are used to categorize domains based on their purpose or origin, such as `.com`, `.org`, `.net`, etc.
  
  - **Root Domain**: The root domain refers to the main domain name without any subdomains, which here is **`bozo.click`**.
  
  - **Subdomain**: A subdomain is a domain that is part of a larger domain. In this case, **`banana`** is the subdomain of the root domain **`bozo.click`**, and **`fruit`** is also a subdomain of **`bozo.click`**.
  
  #### Summary:
  
  - **Top-Level Domain (TLD)**: `.click`
  - **Root Domain**: `bozo.click`
  - **Subdomains**: `banana` and `fruit`

---

### 31. Is a web certificate necessary to use HTTPS?

  Yes, a web certificate (commonly known as an SSL/TLS certificate) is necessary to use HTTPS.
  
  #### Explanation:
  
  - **HTTPS (Hypertext Transfer Protocol Secure)** is the secure version of HTTP. It uses SSL/TLS to encrypt data transmitted between the user's browser and the web server.
  - A web certificate verifies the identity of the website and establishes a secure connection, ensuring that data exchanged is encrypted and protected from eavesdropping or tampering.
  - Browsers will display warnings if you try to access a website using HTTPS without a valid certificate, indicating that the connection is not secure.
  
  #### Key Points:
  
  - SSL/TLS certificates can be obtained from Certificate Authorities (CAs) and must be installed on the web server to enable HTTPS.
  - Websites using HTTPS are often indicated by a padlock symbol in the browser's address bar.
  
### 32. Can a DNS A record point to an IP address or another A record?

  A DNS A record **can only point to an IP address**, not to another A record. 
  
  #### Explanation:
  
  - **A Record**: An A record (Address Record) maps a domain name to its corresponding IPv4 address. For example, if you have an A record for `example.com`, it points directly to the IP address like `192.0.2.1`.
  
  - **CNAME Record**: If you want to point one domain name to another domain name (like pointing `www.example.com` to `example.com`), you would use a CNAME record (Canonical Name Record) instead of an A record.
  
  #### Summary:
  
  - **A Record**: Points to an IPv4 address.
  - **CNAME Record**: Points to another domain name (not an IP address).
  
  ---

### 33. Port 443, 80, 22 is reserved for which protocol?

  - **Port 443**: Reserved for **HTTPS** (Hypertext Transfer Protocol Secure). This port is used for secure communication over a computer network.
  
  - **Port 80**: Reserved for **HTTP** (Hypertext Transfer Protocol). This port is used for unencrypted web traffic.
  
  - **Port 22**: Reserved for **SSH** (Secure Shell). This port is used for secure remote login and other secure network services.
  
  #### Summary:
  
  - **Port 443**: HTTPS
  - **Port 80**: HTTP
  - **Port 22**: SSH
  


### 34. What will the following code using Promises output when executed?

#### Example Code:

    ```javascript
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise resolved!");
        }, 1000);
    });
    
    promise
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
  output: Promise resolved!

    Explanation:
      Promise Creation: A new Promise is created that will resolve after 1 second (1000 milliseconds) with the message "Promise resolved!".
      .then() Method: The .then() method is called on the promise, which is used to handle the resolved value. When the promise resolves successfully, it logs the result to the console.
      Asynchronous Behavior: Because the promise resolves after a delay, you will see no immediate output. After 1 second, you will see the output "Promise resolved!" in the console.
    Note:
      If there were an error in the promise (e.g., by calling reject("Error occurred!") instead of resolve), the output would be handled by the .catch() method.



# FINAL EXAM:

1. What is the default port for HTTP/HTTPS/SSH?
Answer:

HTTP: Port 80
HTTPS: Port 443
SSH: Port 22










  
