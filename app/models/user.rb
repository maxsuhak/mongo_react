class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Search

  field :first_name, type: String
  field :last_name,  type: String
  field :email,      type: String

  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
  validates :email, presence: true
  validates :email, uniqueness: true

  search_in :first_name, :last_name, :email
end
