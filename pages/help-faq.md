---
layout: default
title: FAQ
description: related to Ezetap integration
type: Help
---

<ol>
  {% for post in site.posts %}
    <li>
		<a href="javascript:togglePost('{{ post.id }}');"><b>{{ post.title }}</b></a>
		<div id ="{{ post.id }}" style="display:none" class="post-content">
			{{ post.content }}
		</div>
    </li>
  {% endfor %}
</ol>

<script language="javascript"> 
function togglePost( p_id ) {

	// first close all elements
	var elems = document.querySelectorAll("post-content"),
    i = 0,
    len = elems.length;

	for (i; i < len; i++) {
    	elems[i].style.display = "none";
	}

	// then, toggle the element clicked.
	var elem = document.getElementById(p_id);
	if(elem.style.display == "block") { elem.style.display = "none"; }
	else { elem.style.display = "block"; }
} 
</script>
