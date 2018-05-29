const query = require('./../');
const { expect } = require('chai');

describe('#index', () => {
  describe('#combineQuery', () => {
    it('should return single query', () => {
      const firstQuery = 'hoge=hoge';
      expect(query.combineQuery(firstQuery)).to.equal('?hoge=hoge');
    })

    it('should combine two queries', () => {
      const firstQuery = 'hoge=hoge';
      const secondQuery = 'fuga=fuga';
      expect(query.combineQuery([firstQuery, secondQuery])).to.equal('?hoge=hoge&fuga=fuga');
    })

    it('should combine more than two queries', () => {
      const firstQuery = 'hoge=hoge';
      const secondQuery = 'fuga=fuga';
      const thirdQuery = 'mega=mega';
      expect(query.combineQuery([firstQuery, secondQuery, thirdQuery])).to.equal('?hoge=hoge&fuga=fuga&mega=mega');
    })
  })

  describe('#buildUserQuery', () => {
    describe('when status is one', () => {
      it('should return correct query parameter', () => {
        const admin = true;
        const validStatuses = ['verified'];
        expect(query.buildUserQuery(admin, validStatuses)).to.equal('?admin=true&status[]=verified');
      });
    });

    describe('when more than one status', () => {
      it('should return correct query parameter', () => {
        const admin = true;
        const validStatuses = ['registered', 'verified'];
        expect(query.buildUserQuery(admin, validStatuses)).to.equal('?admin=true&status[]=registered&status[]=verified');
      });
    });
  });
});

