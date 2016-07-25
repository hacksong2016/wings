
Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {})],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

Images.allow({
  insert(userId, doc){true},
  download(userId){true}
})

