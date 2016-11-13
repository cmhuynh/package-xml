var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
var expect = chai.expect
var fs = require('fs-extra')
var xml = require('libxmljs')
var utils = require('./../js/packageUtils')
var mocks = require('./../js/mocks')
var getMembers = require('./../js/members')

describe('Generate a package XML', function () {

    this.timeout(30000);
    // Private variables, set in Before action
    var root = '/Users/John/Github/package-xml/test/fixtures/src'
    // var root = '/Users/John/Github/esba/src'
    var metadata, generator, getDirectoryContentsPromise

    before(function () {
        getDirectoryContentsPromise = utils.getDirectoryContents(root)
        metadata = utils.getMetadataTypes()
        generator = require('./../js/packageXmlGenerator')
    })

    it('should get Components', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ApexComponent', files, metadata, true)
            expect(members).to.contain('MyhelloWorld')
        })
    })

    it('should get Custom Objects', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('CustomObject', files, metadata, true)
            expect(members).to.contain('MyFirstObject__c')
        })
    })

    it('should get Custom Apex Classes', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ApexClass', files, metadata, true)
            expect(members).to.contain('MyhelloWorld')
        })
    })

    it('should get Custom Apex Pages', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ApexPage', files, metadata, true)
            expect(members).to.contain('SampleApexPage')
        })
    })

    it('should get Custom Apex Triggers', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('ApexTrigger', files, metadata, true)
            expect(members).to.contain('MyHelloWorld')
        })
    })

    it('should get Groups', function () {
        return getDirectoryContentsPromise.then(files => {
            var members = getMembers('Group', files, metadata, true)
            expect(members).to.contain('Provider_Sharing')
        })
    })


})