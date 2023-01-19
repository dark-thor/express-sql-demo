const {getLocationForIp} = require('../../controllers/LocationController');
const {getLocation} = require('../../services/LocationApi');
const {IpLocation} = require('../../models/IpLocation');

jest.mock('../../services/LocationApi')
jest.mock('../../models/IpLocation')

describe('LocationController', ()=> {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('getLocationForIp Existing Record', async () => {
    const existingIpRecord = {
      toJSON: () => {return {id: 1, ip: '8.8.8.8'}}
    };
    IpLocation.findOne.mockResolvedValueOnce(existingIpRecord);
    const req = {params: {ip: '8.8.8.8'}};
    const mockSend =  jest.fn().mockResolvedValueOnce(null);
    const res = {
      status: (code) => { return { send: (data) => mockSend } }
    };
    getLocation.mockResolvedValueOnce({
      status: 200,
      data: {
        ip: '8.8.8.8',
        country: 'US',
      }
    })
    const next = () => jest.fn().mockResolvedValueOnce(true);
    const result = await getLocationForIp(req, res, next);
    expect(result).not.toBeNull();
    expect(IpLocation.findOne).toHaveBeenCalled();
    expect(getLocation).not.toHaveBeenCalled();
  })

  it('getLocationForIp 404 Response', async () => {
    const ipAddress = '8.8.8.8';
    IpLocation.findOne.mockResolvedValueOnce(null);
    const req = {params: {ip: ipAddress}};
    const mockSend =  jest.fn().mockResolvedValueOnce(null);
    const res = {
      status: (code) => { return { send: (data) => mockSend } }
    };
    getLocation.mockResolvedValueOnce({
      status: 404,
      data: 'Not Found',
    })
    const next = () => jest.fn().mockResolvedValueOnce(true);
    const result = await getLocationForIp(req, res, next);
    expect(result).not.toBeNull();
    expect(IpLocation.findOne).toHaveBeenCalled();
    expect(getLocation).toHaveBeenCalledWith(ipAddress);
  })

  it('getLocationForIp Fetched and Saved', async () => {
    const ipAddress = '8.8.8.8';
    IpLocation.findOne.mockResolvedValueOnce(null);
    const req = {params: {ip: ipAddress}};
    const mockSend =  jest.fn().mockResolvedValueOnce(null);
    const res = {
      status: (code) => { return { send: (data) => mockSend } }
    };
    const ipResult = {
      ip: '8.8.8.8',
      city: 'Mountain View',
      country: 'US',
      loc: '37.4056,-122.0775'
    };
    getLocation.mockResolvedValueOnce({
      status: 200,
      data: ipResult,
    });
    IpLocation.findOrCreate.mockResolvedValueOnce([{id: 1, ...ipResult}, true])
    const next = () => jest.fn().mockResolvedValueOnce(true);
    const result = await getLocationForIp(req, res, next);
    expect(result).not.toBeNull();
    expect(IpLocation.findOne).toHaveBeenCalled();
    expect(getLocation).toHaveBeenCalledWith(ipAddress);
    expect(IpLocation.findOrCreate).toHaveBeenCalled();
  })
})
