define(["plugin-dependencies","jquery","../../api","text!./template.html","text!./comment.html","text!./day-seperator.html","css!./template.css"],function(e,t,n,a,i,o){a=e.utils.createTemplate(a),i=e.utils.createTemplate(i),o=e.utils.createTemplate(o);var l="",s="";return function(d){var r=function(e){return e.sort(function(e,t){return new Date(e.created)-new Date(t.created)})},m=l||e.user.get("displayName")||"",c=s||e.user.get("email")||"",u=e.user.get("userId")?!0:!1,p=r(d.get("comments")),f=p.length,v=t(o({day:e.translate("Today")})),g=t(a({translate:e.translate,viewerDisplayName:m,viewerEmail:c,isCCUser:u}));e.log("ets",{code:"CC_FILE_VIEW",sub_code:"PUBLIC_COMMENTS"});var h=g.find("#public-link-page-add-comment textarea"),C=g.find("ul.comments"),b=g.find("#submit-comment"),x=g.find("#cancel-comment"),T=function(){h.val(""),g.addClass("not-in-focus"),g.removeClass("invalid-text invalid-name invalid-email"),g.find(".char-count em").text("0")},y=function(){var e=g.hasClass("not-in-focus");e&&g.removeClass("not-in-focus")},E=function(e){var t=e.target,n=t.value.length;g.find(".char-count em").text(n),e.preventDefault(),e.stopPropagation()},_=function(a){a.preventDefault(),a.stopPropagation();var o=h.blur().val(),r=g.find("#commenter-name").blur().val(),m=g.find("#commenter-email").blur().val(),c=e.utils.isEmailValid(m);return g.removeClass("invalid-name invalid-email invalid-text"),o&&r&&c?(e.log()("ets",{code:"CC_PUBLIC_ASSET_LINK",sub_code:"COMMENT"}),e.log()("cca",{code:"Public Comments",root:{assetid:d.get("linkId"),assetType:"File",viewType:"1Up"}}),g.find(".textinput").attr("disabled",!0),g.addClass("disabled"),b.attr("disabled",!0),void n.addComment(d.get("linkId"),d.get("location"),{commenter_name:r,commenter_email:m,content:o}).fail(function(){}).then(T).then(function(){l=r,s=m;var n=t(i({name:e.utils.htmlEncode(r),time:e.utils.dateTimeAgoText((new Date).getTime()),comment:e.utils.lineBreakEncode(e.utils.htmlEncode(o))}));n.css({position:"absolute",opacity:0,margin:0}),C.prepend(v,n);var a=n.height();n.css({height:0,position:"relative"}),n.animate({marginTop:15,height:a,marginBottom:15},400,function(){n.css({height:"auto"}),g.find(".textinput").attr("disabled",!1),b.attr("disabled",!1),g.removeClass("disabled"),g.find(".char-count em").text("0"),n.animate({opacity:1},100)}),n.show()})):(r||g.addClass("invalid-name"),c||g.addClass("invalid-email"),void(o||g.addClass("invalid-text")))};h.on("focus",y),h.on("keyup",E),b.on("click",_),x.on("click",T),g.find(".textinput").on("focus",function(){g.trigger("input-focus")}),g.find(".textinput").on("blur",function(){g.trigger("input-blur")});for(var D,w=e.utils.formatMonthDateAndYear(new Date),I=f-1;I>=0;I--){var k=p[I],M=e.utils.formatMonthDateAndYear(new Date(k.created));M!=D&&(C.append(M===w?v:o({day:M})),D=M),C.append(i({name:e.utils.htmlEncode(k.commenter_name),time:e.utils.dateTimeAgoText(k.created),comment:e.utils.htmlEncode(k.content)}))}return g}});