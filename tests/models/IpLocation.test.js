describe('IpLocation', ()=> {
  it('Db Created', async () => {
    const {IpLocation, sequelize} = require('../../models/IpLocation');
    await sequelize.sync();
    const tableName = await IpLocation.getTableName();
    const result = await IpLocation.findAndCountAll()
    expect(tableName).toEqual('iplocations');
    expect(result.rows).toEqual([]);
    expect(result.count).toEqual(0);  
  })
});
