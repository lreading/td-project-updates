# Priority
- Figure out a new name. Need to search github to make sure no repos exist with that name, no matter who the owner is.
- Add a footer for powered by <name> and link to github. This should be able to be disabled in the config, but on by default. make sure covered by e2e tests. The link to the github 2
- Add visual regression testing, make it a gate with a threshold, update AGENTS, etc.
- Work on interactive CLI / init.  Include things like project name, if it's using github, etc etc. After using interactive mode, the user should have a minimal working config.  Ask them at the end if they want to start the server to see what it made.
- Move all of the images and stuff out of the ui, and into the config somewhere.
- Make sure images are loaded from config and able to be served
- Add some info about keyboard shortcuts before entering presentation mode.  Not sure how yet.. either a small ui addition near the button, or something that is dismissable (if dismissable, make sure we save to localStorage a "do not show again" type of setting or whatever)
- Add a documentation site (focus on schema, templates, etc), vitepress stub created
  - Needs schema documentation
  - Needs documentation for different templates (for slides), including screenshots and an example config
  - It might be overkill, but a screenshot/legend would help too?  So screenshot, example yaml, spec file, and then k/v by k/v with a screenshot and an arrow pointing to what that config does, AND what happens when it's empty (hide vs empty).
  - Ensure documentation site is friendly to AI.  Is there an emerging standard similar to robots.txt but for AI?  CF has some kinda structured thing (yaml or json) meant for robots.  Is that the right move, or something else?
  - Document external connectors
  - Document happy path
  - Needs a really great landing page.  People should understand what this is, the benefits of using this, and how to use it and what it might look like. 
  - Ensure SBOM is available
  - Add docs on how to get an agent to generate this stuff for you (link to docs site, suggested prompt, etc)
  - CLI docs, including all flags and use-cases, interactive mode, etc.
- Accessibility: make sure we do a pass to get the current state
- README refactor:
  - Badges at the top (figure out which ones, but include the OSS compliant one, maybe accessibility?)
  - Immediately obvious what this is, highlight the demo and the docs, quickstart
  - Incldue info on the different components (high level)
  - Make sure modules all have their own README - this should be focused on technical bits only
- Select a LICENSE
- Create contributing guiddelines


# Infrastructure
- Update repo name, do a pass at updating repo contents. Add branch protections, do a pass at other configuration, and also make sure that tags are immutable (if possible). If NOT possible, develop a pipeline that alerts when an existing tag is overwritten or deleted? Gotta make sure I'm aware of it, maybe make an issue?
- Claim scope in NPM
- Set up domain name
- Figure out deployment model (docs vs slides)
- Dogfood: create an initial slide for q1 2026. No history yet, good edge case to exercise.
- Create roadmap and issues
- Create GH Actions pipelines and do some security stuff (SAST, DAST, SCA, all actions pinned to commits, dependabot, SBOM, ensure we can push findings to security tab, etc).  Also all of our gates need to be run and pass.  Split into pull_request, push to main, release, etc.  Release should probably be when pushing a tag.  
- Create a release pipeline (automated, trusted publisher, no write perms for actions if avoidable).  Make sure releases are auto-created, include contributors, include overview, include changelog, and specific commit that was tagged.

# Scripts
- Start fleshing out what data can be pulled dynamically
- Make sure thee main config file is the source of truth for things like gh repo
- Use gh repo from config to pull info
- If GH API is the best way to go, make sure that there's a .env w/ a token.  If not, warn user and exit
- Scripts follow the same rules in AGENTS.md, including tests, file size, typescript, classes vs objects, etc.
- Should have its own package.json / linting, testing, etc... but we should expect to package this as an NPM package ONE DAY (not today)

# Future
- Add presenter notes? Might be a lot of work cuz of fullscreen constraints
- Make all icons, logos, text part of config
- Publish an npm package that takes a config and generates a static site so others can use this if they so choose.
- Create "themes" (just one default), but allow users to create other themes if they want
