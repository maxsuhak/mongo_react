feature 'Users', type: :feature do
  before do
    visit '/'
  end

  scenario 'visit users page' do
    expect(page).to have_content 'Users'
  end

  scenario 'page has table' do
    expect(page.has_css?('.ReactTable')).to be_truthy
  end
end
