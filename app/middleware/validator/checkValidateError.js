const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
}