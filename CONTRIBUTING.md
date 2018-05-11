# Contributing to PostCSS Preset Env

You want to help? You rock! Now, take a moment to be sure your contributions
make sense to everyone else.

## Reporting Issues

Found a problem? Want a new feature?

- See if your issue or idea has [already been reported].
- Provide a [reduced test case] or a [live example].

Remember, a bug is a _demonstrable problem_ caused by _our_ code.

## Submitting Pull Requests

Pull requests are the greatest contributions, so be sure they are focused in
scope and avoid unrelated commits.

1. To begin; [fork this project], clone your fork, and add our upstream.
   ```bash
   # Clone your fork of the repo into the current directory
   git clone git@github.com:YOUR_USER/postcss-preset-env.git

   # Navigate to the newly cloned directory
   cd postcss-preset-env

   # Assign the original repo to a remote called "upstream"
   git remote add upstream git@github.com:csstools/postcss-preset-env.git

   # Install the tools necessary for testing
   npm install
   ```

2. Create a branch for your feature or fix:
   ```bash
   # Move into a new branch for your feature
   git checkout -b feature/thing
   ```
   ```bash
   # Move into a new branch for your fix
   git checkout -b fix/something
   ```

3. If your code follows our practices, then push your feature branch:
   ```bash
   # Test current code
   npm test
   ```
   ```bash
   # Push the branch for your new feature
   git push origin feature/thing
   ```
   ```bash
   # Or, push the branch for your update
   git push origin update/something
   ```

That’s it! Now [open a pull request] with a clear title and description.

## Adding a new plugin to Postcss Preset Env

If you want to add a new plugin, follow the
[pull request guidelines](#submitting-pull-requests) while making these changes:

- Ensure the feature exists in [cssdb](https://cssdb.org/).
- Add the plugin to the `dependencies` list in [`package.json`](package.json).
- Add the plugin to
  [`lib/plugins-by-id.js`](lib/plugins-by-id.js).

[already been reported]: issues
[fork this project]:     fork
[live example]:          https://codepen.io/pen
[open a pull request]:   https://help.github.com/articles/using-pull-requests/
[reduced test case]:     https://css-tricks.com/reduced-test-cases/
