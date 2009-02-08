jQuery.noConflict();
jQuery(function(){
  function getLevel(row){
    return parseInt(jQuery(row).attr('class').match(/level-(\d+)/)[1]);
  }
  
  function sortize(ids){
    if(ids.length > 1){
      jQuery('table#site-map tbody').sortable({
        handle: '.handle',
        cursor: 'move',
        axis:'y',
        items: '#' + ids.join(', #'),
        update: function(event, ui){
          var data = 'pages[]=' + gatherIds(ui.item.prevAll('tr.level-' + (getLevel(ui.item) - 1) + ':first' )).join('&pages[]=');
          jQuery.ajax({
            url: '/admin/pages/order',
            type: 'POST',
            data: data
          });
        }
      });
    }    
  }
  
  function gatherIds(parent) {
    var level = getLevel(parent);
    var nestedLevels = '.level-' + [level+2, level+3, level+4, level+5, level+6, level+7].join(', .level-')
    var child = jQuery(parent).nextAll('tr:not(' + nestedLevels + '):first');
    var ids = []
    while(child.hasClass('level-' + (level+1))) {
      ids.push(child.attr('id'));
      child = child.nextAll('tr:not(' + nestedLevels + '):first');
    }
    return ids;
  }
  
  function sortEnableLevel(level){
    jQuery('tr.level-' + level).each(function(){
      sortize(gatherIds(this));
    });
  }
  for(var i=0; i< 10; i++){sortEnableLevel(i)};
 
  
  jQuery('ul.segment-list').sortable({
    handle: '.handle',
    cursor: 'move',
    axis:'y',
    containment: 'parent',
  });  
});
