# Uncomment this if you reference any of your controllers in activate
require_dependency 'application'

class ReorderExtension < Radiant::Extension
  version "0.1"
  description "Allows (re)ordering of pages in the page tree."
  url "http://dev.radiantcms.org/"
  
  define_routes do |map|
    map.with_options :controller => "admin/page" do |page|
      page.page_move_lower "admin/pages/order", :action => "order"
    end
  end
  
  def activate
    admin.page.index.add :sitemap_head, "order_header"
    admin.page.index.add :node, "order"
    admin.page.index.add :top, 'header'
    Page.send :include, Reorder::PageExtensions
    Admin::PageController.send :include, Reorder::PageControllerExtensions
    Admin::PageController.send :helper, Reorder::PageHelper
    Admin::PageController.send :protect_from_forgery, :except => [:order]
    StandardTags.send :include, Reorder::TagExtensions
  end
  
  def deactivate
  end
  
end
