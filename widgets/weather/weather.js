/* global Math, Dashboard, rivets, $ */

Dashing.widgets.Weather = function(dashboard) {
    var widget,
        climacon_class = function(weather_code) {
            if (/47|45|39|38|37|^4$|^3$/.test(weather_code)) {
                return 'lightning';
            }
            else if (/46|43|42|41|16|15|14|13|^7|^5/.test(weather_code)) {
                return 'snow';
            }
            else if (/44|26/.test(weather_code)) {
                return 'cloud';
            }
            else if (/40|12|11/.test(weather_code)) {
                return 'rain';
            }
            else if (/36/.test(weather_code)) {
                return 'thermometer full';
            }
            else if (/35|17/.test(weather_code)) {
                return 'hail';
            }
            else if (/34|32/.test(weather_code)) {
                return 'sun';
            }
            else if (/33|31/.test(weather_code)) {
                return 'moon';
            }
            else if (/30|28/.test(weather_code)) {
                return 'cloud sun';
            }
            else if (/29|27/.test(weather_code)) {
                return 'cloud moon';
            }
            else if (/25/.test(weather_code)) {
                return 'thermometer low';
            }
            else if (/24|23/.test(weather_code)) {
                return 'wind';
            }
            else if (/22|21|19/.test(weather_code)) {
                return 'haze';
            }
            else if (/20/.test(weather_code)) {
                return 'fog';
            }
            else if (/18|10|^6/.test(weather_code)) {
                return 'sleet';
            }
            else if (/9|8/.test(weather_code)) {
                return 'drizzle';
            }
            else {
                return 'tornado';
            }
        },
        defineBinders = function() {
            if (!('climacon' in rivets.binders)) {
                rivets.binders.climacon = function(el, value) {
                    if (!value) return;
                    el.className = 'fa climacon icon-background ' +
                                    climacon_class(value);
                };
            }
        },
        defineFormatters = function() {
            if (!('to_celsius' in rivets.formatters)) {
                rivets.formatters.to_celsius = function(value) {
                    return (Math.round((value - 32)*5/9)) + 'º C';
                }
            }
        };
    this.__init__ = Dashing.utils.widgetInit(dashboard, 'weather');
    this.row = 1;
    this.col = 1;
    this.data = {};
    this.WOEID = 395269;
    this.getWidget = function () {
        return widget;
    };
    this.getData = function () {
    	var self = this;
        $.get('https://query.yahooapis.com/v1/public/yql', {
            q: 'select location.city, item.condition from weather.forecast where woeid = ' + self.WOEID,
            format: 'json'
        }, function(data) {
            if (data.query.results == null) {
                console.warn('Weather widget says: WOEID invalid');
                return;
            }
            var city = data.query.results.channel.location.city,
                condition = data.query.results.channel.item.condition;
            $.extend(self.data, data.query.results.channel);
        });
    };
    this.interval = 300000; // five minutes
    defineBinders();
    defineFormatters();
};
