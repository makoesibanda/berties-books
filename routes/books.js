// Set up the router
const express = require("express");
const router = express.Router();

/// Show the search page
router.get('/search', function (req, res) {
    res.render("search.ejs");
});

/// Advanced search: partial match using LIKE
router.get('/search-result', function (req, res, next) {

    const keyword = req.query.keyword;
    const sqlquery = "SELECT * FROM books WHERE name LIKE ?";

    // Add wildcards for partial matching
    const searchValue = "%" + keyword + "%";

    db.query(sqlquery, [searchValue], (err, result) => {
        if (err) return next(err);

        res.render("search-results.ejs", {
            searchedBooks: result,
            keyword: keyword
        });
    });
});


// List all books
router.get('/list', function (req, res, next) {

    const sqlquery = "SELECT * FROM books";

    db.query(sqlquery, (err, result) => {
        if (err) return next(err);

        res.render("list.ejs", { availableBooks: result });
    });
});

// List all books priced under £20
router.get('/bargainbooks', function (req, res, next) {

    const sqlquery = "SELECT * FROM books WHERE price < 20";

    db.query(sqlquery, (err, result) => {
        if (err) return next(err);

        res.render('bargainbooks.ejs', { bargainBooks: result });
    });
});

// Export the router
module.exports = router;
