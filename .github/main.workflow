workflow "Build and Deploy" {
  on = "push"
  resolves = ["deploy"]
}

action "ignore branch gh-pages" {
  uses = "actions/bin/filter@707718ee26483624de00bd146e073d915139a3d8"
  args = "branch ^(?!.*gh-pages).*$"
}

action "install" {
  uses = "actions/npm@de7a3705a9510ee12702e124482fad6af249991b"
  args = "install"
  env = {
    TZ = "/usr/share/zoneinfo/Asia/Tokyo"
  }
  needs = ["ignore branch gh-pages"]
}

action "build" {
  uses = "actions/npm@de7a3705a9510ee12702e124482fad6af249991b"
  needs = ["install"]
  args = "run build"
  env = {
    TZ = "/usr/share/zoneinfo/Asia/Tokyo"
  }
}

action "only master branch" {
  uses = "actions/bin/filter@707718ee26483624de00bd146e073d915139a3d8"
  needs = ["build"]
  args = "branch master"
}

action "deploy" {
  uses = "actions/npm@de7a3705a9510ee12702e124482fad6af249991b"
  needs = ["only master branch"]
  args = "run deploy"
  env = {
    TZ = "/usr/share/zoneinfo/Asia/Tokyo"
  }
}
