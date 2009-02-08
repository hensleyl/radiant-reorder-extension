module Reorder::PageControllerExtensions
 
  def order
    ids = params[:pages].uniq.map{|page| page.match(/page-(\d+)/)[1]}
    Page.find(ids.first).parent.unordered_children(:order => nil).update_all(
      ['position = FIND_IN_SET(id, ?)', ids.join(',')],
      { :id => ids }
    )
    head :ok
  end
  
end
