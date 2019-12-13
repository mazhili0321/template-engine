let flatList = {
  data: [],
  tree2flat: function (list) {
    for (let i = 0; i < list.length; i++) {
      this.data.push(list[i]);
      if (list[i].children.length > 0) {
        this.tree2flat(list[i].children)
      }
    }
  }
};
Zepto(function($){
  $('#menuTree li[role="treeitem"]>a').on('click', function(e){
    let aElement = e.currentTarget;
    let liElement = e.currentTarget.parentNode;
    if (liElement.getAttribute('aria-haspopup') === 'true') {
      // TODO expand
      liElement.setAttribute('aria-expanded', liElement.getAttribute('aria-expanded') === 'false' ? true : false);
      // TODO change icon
      let iElement = $(aElement).children('i');
      if (liElement.getAttribute('aria-expanded') === 'true') {
        iElement.removeClass('icon-jiantouxiao').addClass('icon-arrow-left')
      } else {
        iElement.removeClass('icon-arrow-left').addClass('icon-jiantouxiao')
      }
    } else {
      // TODO add active class
      $('#menuTree li a').removeClass('active');
      $(aElement).addClass('active');
      // TODO show active menu text
      let data = JSON.parse($('#articleTree').html());
      flatList.tree2flat(data);
      let matchItem = flatList.data.find(v => v.id === aElement.getAttribute('data-id'));
      if (matchItem) {
        $('#main').html(matchItem.content)
      }
    }
  });
});