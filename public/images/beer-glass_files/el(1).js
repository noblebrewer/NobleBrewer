define(["plugin-dependencies","jquery","text!./template.html","css!./template.css"],function(e,t,r){var n=function(t){for(var r,n=t.get("colors"),a="",l=0;l<n.length;l++)r=e.utils.hexToRgb(n[l]),a+=r.r/255+","+r.g/255+","+r.b/255,l<n.length-1&&(a+=",");var s=2,u="Custom",o=0,c=t.get("name").substr(0,t.get("name").lastIndexOf(".")),d="rgb";return c||(c="My Kuler Theme"),e.config.kuler_url+"/create/color-wheel?rgbvalues="+a+"&base="+s+"&rule="+u+"&selected="+o+"&name="+escape(c)+"&mode="+d};return function(e){var a=e.get("colors"),l=a&&a.length||0,s=t(r),u=s.find("tr");if(l){for(var o,c=0;l>c;c++)o=a[c],u.append('<td title="#'+o+'" style="background:#'+o+';">&nbsp;</td>');s.find("a").attr("href",n(e)),s.addClass("active")}return s}});