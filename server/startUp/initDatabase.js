
const Category = require('../models/Category')
const tabMock = require('../mock/tabs.json')
const categoriesMock = require('../mock/categories.json')
const Tab = require('../models/Tab')

module.exports = async () => {
  const tabs = await Tab.find()
  if (tabs.length !== tabMock.length) {
    await createInitialEntity(Tab, tabMock)
  }

  const categories = await Category.find()
  if (categories.length !== categoriesMock.length) {
    await createInitialEntity(Category, categoriesMock)
  }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()
  return Promise.all(
    data.map(async item => {
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (e) {
        return e
      }
    })
  )
}