var cf_name=["siteID","zanpid","affiliado","cjid"];function query_param(b){for(var a=window.location.search.substring(1).split("&"),c=0;c<a.length;c++){var d=a[c].indexOf("=");if(0<d){var e=a[c].substring(0,d),d=a[c].substring(d+1);if(e==b)return unescape(d)}}return""}function set_lan_cookie(b,a,c){var d=new Date;d.setDate(d.getDate()+c);document.cookie=b+"="+escape(a)+(null==c?"":";expires="+d.toGMTString())+"; path=/; domain=.lan.com"}
function get_lan_cookie(b){return 0<document.cookie.length&&(c_start=document.cookie.indexOf(b+"="),-1!=c_start)?(c_start=c_start+b.length+1,c_end=document.cookie.indexOf(";",c_start),-1==c_end&&(c_end=document.cookie.length),unescape(document.cookie.substring(c_start,c_end))):""}var otid=query_param("otid"),otid_longest_days_to_last=90;
if(""!=otid||""!=get_seo_data()){var s_cid="null",otid_scid;""!=otid?(s_cid=query_param("s_cid"),""==s_cid&&(s_cid="null")):otid_scid=get_seo_data();var cf_value="null";for(i=0;i<cf_name.length;i++)""!=query_param(cf_name[i])&&(cf_value=query_param(cf_name[i]));var otid_cookie_value=get_lan_cookie("otid");""!=otid_cookie_value&&(otid_cookie_value+="|");var now=new Date,year=now.getUTCFullYear(),month=now.getUTCMonth()+1;10>month&&(month="0"+month);var day=now.getUTCDate();10>day&&(day="0"+day);var hours=
now.getUTCHours();10>hours&&(hours="0"+hours);var minutes=now.getUTCMinutes();10>minutes&&(minutes="0"+minutes);var seconds=now.getUTCSeconds();10>seconds&&(seconds="0"+seconds);var UTC_iso_date_time=year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds,otid_cookie_value=""!=otid?otid_cookie_value+(otid+"/"+s_cid+"/"+cf_value+"/"+UTC_iso_date_time):otid_cookie_value+(otid_scid+"/"+cf_value+"/"+UTC_iso_date_time);set_lan_cookie("otid",otid_cookie_value,otid_longest_days_to_last)}
function get_qs_param(b,a){var a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]"),c=RegExp("[\\?&]"+a+"=([^&#]*)").exec(b);return null==c?"":c[1]}function get_seo_data(){var b=document.referrer,a=/^https?:\/\/[a-z]*.([a-z]*).([a-z]*)/.exec(b);return!a?"":"google"==a[1]?(b=get_qs_param(b,"q"),b=b.replace(/\//,/~/),a="SEO."+a[1]+"."+a[2]+"_KW_"+b,"94925/"+a):"yahoo"==a[1]?(b=get_qs_param(b,"p"),b=b.replace(/\//,/~/),a="SEO."+a[1]+"."+a[2]+"_KW_"+b,"94945/"+a):""};
