[Enter description here]

![Screenshot or GIF movie](url)



## Repro Steps

1. Open a project containing

.jshintrc at root:

esversion: 6
node: true

package.json
```
"jshintConfig": {
  "esversion": "6",
  "node": true
}
```


**Expected:** Jshint Linter works in all files
**Actual:**   Jshint only works in first opened file

## Versions

* **Atom:**       1.21.1
* **Atom-Shell:**
* **OS:**         Mac OS X 10.11.2
* **Misc**
    * apm  1.18.5
    * npm  3.10.10
    * node 6.9.5 x64
    * python 2.7.10
    * git 2.14.2

---

<small>This report was created in and posted from the Atom editor using the package `bug-report` v0.7.1.</small>
