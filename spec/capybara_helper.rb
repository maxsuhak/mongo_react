require 'capybara'
require 'capybara/rails'
require 'capybara/rspec'
require 'capybara/dsl'
require 'capybara-screenshot/rspec'
require 'selenium-webdriver'

SAVE_PATH      = 'public/images/capybara'.freeze
SCREENSHOT_DIR = Rails.root.join(SAVE_PATH)
DRIVER         = :selenium_chrome

RSpec.configure do |config|
  config.include Capybara::DSL

  config.before(:suite) do
    FileUtils.rm_rf   SCREENSHOT_DIR
    FileUtils.mkdir_p SCREENSHOT_DIR
  end

  Capybara.register_driver DRIVER do |app|
    options = Selenium::WebDriver::Chrome::Options.new(args: [
                                                         'headless',
                                                         'disable-gpu',
                                                         'no-sandbox',
                                                         'window-size=1920,1080'
                                                       ])

    Capybara::Selenium::Driver.new(app,
                                   browser: :chrome,
                                   options: options)
  end

  Capybara.javascript_driver        = DRIVER
  Capybara.default_driver           = DRIVER
  Capybara.save_path                = SAVE_PATH
  Capybara.default_max_wait_time    = 20
  Capybara.ignore_hidden_elements   = false

  Capybara::Screenshot.register_driver DRIVER do |driver, path|
    driver.browser.save_screenshot(path)
  end
end
