import tap from 'tap'
import * as metro from '../src/metro.mjs'

tap.test('start', t => {
	let url = metro.url('https://example.com')
	t.equal(url.href, 'https://example.com/')
	t.end()
})

tap.test('search', t => {
	let url = metro.url('https://example.com', '?foo=bar')
	t.equal(url.href, 'https://example.com/?foo=bar')
	t.end()
})

tap.test('search2', t => {
	let url = metro.url('https://example.com', { 
		search: {
			foo: 'bar'
		}
	})
	t.equal(url.href, 'https://example.com/?foo=bar')
	t.end()
})

tap.test('search3', t => {
	let url = metro.url('https://example.com/?foo=bar', { 
		search: {
			foo: 'baz'
		}
	})
	t.equal(url.href, 'https://example.com/?foo=baz')
	t.end()
})

tap.test('search4', t => {
	let url = metro.url('https://example.com', '?foo=bar', '?foo=baz')
	t.equal(url.href, 'https://example.com/?foo=baz')
	t.end()
})

tap.test('searchFunction', t => {
	let url = metro.url('https://example.com?foo=bar', { 
		search: (search, url) => {
			let sp = new URLSearchParams(search)
			sp.delete('foo')
			return sp
		}
	})
	t.equal(url.href, 'https://example.com/')
	t.end()
})

tap.test('searchParams', t => {
	let url = metro.url('https://example.com?foo=bar', { 
		searchParams: {
			foo: 'baz'
		}
	})
	t.equal(url.href, 'https://example.com/?foo=bar&foo=baz')
	t.end()
})

tap.test('searchParamsFunction', t => {
	let url = metro.url('https://example.com/?foo=bar', {
		searchParams: (searchParams, url) => searchParams.delete('foo')
	})
	t.equal(url.href, 'https://example.com/')
	t.end()
})

tap.test('unknownProp', t => {
	t.throws(() => {
		let url = metro.url('https://example.com', {
			something: 'unknown'
		})
	}, /unknown url parameter/);
	t.end()
})

tap.test('hash', t => {
	let url = metro.url('https://example.com', {
		hash: '#foo'
	})
	t.equal(url.href, 'https://example.com/#foo')
	t.end()
})

tap.test('port', t => {
	let url = metro.url('https://example.com', {
		port: 8080
	})
	t.equal(url.href, 'https://example.com:8080/')
	t.end()
})

tap.test('username', t => {
	let url = metro.url('https://example.com/?user=foo', {
		username: (username, url) => {
			username = url.searchParams.get('user')
			url.searchParams.delete('user')
			return username
		}
	})
	t.equal(url.href, 'https://foo@example.com/')
	t.end()
})

tap.test('with', t => {
	let url = metro.url('https://example.com?foo=bar').with({
		hostname: 'muze.nl'
	})
	t.equal(url.href, 'https://muze.nl/?foo=bar')
	t.end()
})