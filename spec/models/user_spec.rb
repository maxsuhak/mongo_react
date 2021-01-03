require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { build(:user) }

  it { is_expected.to be_mongoid_document }
  it { is_expected.to have_timestamps }
  it { is_expected.to have_fields(:email, :first_name, :last_name) }

  it 'has a valid factory' do
    expect(user).to be_valid
  end

  it 'is invalid with invalid attributes' do
    expect(build(:user, email: '')).to_not be_valid
  end
end
