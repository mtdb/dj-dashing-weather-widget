dj-dashing-weather-widget
=========================

Simple Django Dashing widget to display weather info. Uses Yahoo's weather API. Based on [David Underwood](https://github.com/davefp) weather widget.

![Weather Widget](https://dl.dropboxusercontent.com/u/5594456/dashing/weather-widget.png)

## Usage

Add **weather** to [``INSTALLED_WIDGETS``](http://django-dashing.readthedocs.org/en/latest/getting-started.html#django-settings), search in [Yahoo! WOEIDs](http://woeid.rosselliot.co.nz/)  your WOEID and finally add the following code to your dashing [javascript configuration file](http://django-dashing.readthedocs.org/en/latest/getting-started.html#config-file).

    <dashboard>.addWidget('wheater_widget', 'Weather', {
        WOEID: <WOEID>
    });

Replacing ``<dashboard>`` for your dashboard name and ``<WOEID>`` for your WOEID id.

