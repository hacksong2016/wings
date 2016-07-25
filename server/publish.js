// 学校
Meteor.publish('schools', ()=>{
    const where = {};
    const options = {sort:{updateat: -1}, fields: {name:1, coord: 1 , invest: 1,childrens:1}};
    return School.find(where, options);
});


// 学校
Meteor.publish('school', (id)=>{
	const where = {_id:id};
	const options = {sort:{orderby: -1}, limit : 1};
    return School.find(where, options);
});
