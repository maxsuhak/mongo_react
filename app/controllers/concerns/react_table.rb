module ReactTable
  extend ActiveSupport::Concern

  private

  def table_data(klass, page_size = 50)
    safe_fields = klass.sort_fields

    klass.from("(#{klass.sortable.to_sql}) #{klass.name.snakecase.pluralize}")
         .page(params[:page])
         .per(params[:page_size] || page_size)
         .order(sort_query(safe_fields))
         .where(filter_query(safe_fields))
  end

  def sort_query(valid_fields)
    return unless params[:sort]

    query = []

    params[:sort].each do |sort|
      sort = JSON.parse(sort)

      next unless valid_fields.include?(sort['id'])

      direction = sort['desc'] ? 'DESC' : 'ASC'

      query << "#{sort['id']} #{direction}"
    end

    query.join(', ')
  end

  def filter_query(valid_fields)
    return unless params[:filter]

    params[:filter].map do |filter|
      filter = JSON.parse(filter)
      next unless valid_fields.include?(filter['id'])

      query_string = filter['value'].gsub(/(['"])/, '\\1\\1')

      { filter['id'] => /#{query_string}/ }
    end
  end
end
