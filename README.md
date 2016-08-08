# MSSeed13Camp
## How to use navbar
1. Include links to Bootstrap in `<head>`
```  
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <script src="jquery-3.1.0.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
```

2. Include `nav.php` file in `<body>`
```
  <?php
  include "nav.php";
  ?>
```

3. Modify links to your page in `nav.php`
```
  <li <?=findActiveClass("home")?>><a href="home.php">首頁</a></li>
```
