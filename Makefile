ARCHIVE=index.zip
REPORTER=dot

all: test

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER)

clean:
	rm -f $(ARCHIVE)

build: clean
	zip -r $(ARCHIVE) .

.PHONY: test
