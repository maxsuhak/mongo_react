require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe 'GET #index' do
    # let!(:user) {  }

    before do
      create(:user)
      get :index, format: :json
    end

    it 'returns success response' do
      expect(response.successful?).to be_truthy
    end

    it 'returns json' do
      expect(json).to eq({
                           'collection' => User.all.map(&:as_json),
                           'pages' => 0
                         })
    end
  end
end
