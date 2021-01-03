100.times do
  first_name = FFaker::Lorem.word
  last_name  = FFaker::Lorem.word
  email      = FFaker::Internet.email

  User.create(first_name: first_name, last_name: last_name, email: email)
end
