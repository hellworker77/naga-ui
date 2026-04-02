# Conventional Commits Guide

This project follows the Conventional Commits specification to keep the commit history consistent and readable.

Each commit message should follow this format:
````
type(scope): message
````
Example:

````
feat(select): add multi select support
fix(button): disabled state not applied
refactor(utils): extract computePosition
````
** **
## Commit Types
### feat

Adds a new feature or capability.

Use this when introducing functionality that expands what users of the library can do.

Typical cases:

* new component
* new component capability
* new public API
* new utility

Example commits:
````
feat(select): add multi select support
feat(button): add loading state
feat(dialog): implement focus trap
feat(utils): add floating positioning engine
````
## Do NOT use feat if:
* the behavior already existed
* you are only refactoring internal code
** **
### fix

Fixes a bug or incorrect behavior.\
Use this when something was working incorrectly and is now corrected.

Typical cases:

* incorrect logic
* broken accessibility behavior
* incorrect UI state
* positioning bugs
* keyboard interaction issues 

Example commits:
````
fix(select): incorrect highlighted index
fix(button): disabled state not applied
fix(dialog): prevent scroll on open
fix(popover): incorrect position calculation
````
** **
### refactor
Changes internal implementation without altering behavior.\
The public API remains the same.

Typical cases:

* code restructuring
* extracting utilities
* improving architecture
* simplifying logic
* performance improvements without feature changes

Example commits:
````
refactor(select): simplify option registry
refactor(utils): extract computePosition
refactor(button): remove redundant props
refactor(context): split provider logic
````
** **
### docs
Documentation-only changes.\
Use this when modifying or adding documentation.

Typical cases:

* README updates
* demo pages
* usage examples
* API documentation
* comments
Example commits:
````
docs: update README
docs(select): add usage examples
docs(button): document data attributes
docs(roadmap): update component roadmap
````
** **
### test
Adds or updates tests.\
Use when writing or modifying automated tests.

This may include:

* unit tests
* integration tests
* e2e tests

Typical testing tools:
* Vitest
* Jest
* Playwright
* Cypress

Example commits:
````
test(select): add keyboard navigation tests
test(button): test loading state
test(utils): cover computePosition
````
** **

### chore

Maintenance or tooling changes that do not affect the library code.

Typical cases:

* dependency updates
* configuration changes
* CI setup
* formatting
* build configuration
* gitignore

Example commits:
````
chore: update dependencies
chore: configure eslint
chore: setup github actions
chore: update tsconfig
````
** **

## Examples of Good Commit Messages
````
feat(select): add multi select support
fix(button): disabled state not applied
refactor(utils): simplify floating engine
docs: update installation guide
test(dialog): add focus trap tests
chore: update eslint configuration
````
-- --
## Tips
### Prefer small and focused commits.
Good:
````
feat(select): add typeahead search
````
Bad:
````
update stuff
````
Always describe what changed, not how you implemented it.
-- --