How did I get here? This repository wasn't hard to build; it's all about composition of my favourite things.

    brew install hugo
    cd ~/code
    hugo new site foobar foobar/
    # Then I created this README...
    # Now create content/about.md:
    hugo new about.md
    # Now create content/post/first.md:
    hugo new post/first.md
    hugo new post/second.html
    # Choose a theme from http://themes.gohugo.io/
    # * Bootstrap (basic site)
    # * Strata (tomre.es)
    hugo --theme=bootstrap
    # Launch a server:
    hugo server

Now I'm going to inline the theme. Why? Because modular themes are not a feature I want when I am building precisely one site.

    export THEME=bootstrap
    cp -r themes/$THEME/* .

Furthermore:

* Create `less/` folder with two basic stylesheets
  * Bootstrap child
  * Application
* Create `/less/bootswatch` based off any bootswatch repo.
* Install `bootstrap#3.3.5` from source.
  * We're not using everything here. I mean we already had most of it in the theme.
* Inline the bootstrap theme:
  * `export THEME=themes/boostrap`
  * `rm $THEME/README.md $THEME/theme.toml $THEME/LICENSE.md`
  * `cp -r themes/bootstrap/* .`
  * `git add data static/js static/css static/fonts archetypes images layouts`



    
