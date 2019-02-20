workflow "Build and Deploy" {
  on = "push"
  resolves = ["deploy"]
}

action "install" {
  uses = "actions/npm@de7a3705a9510ee12702e124482fad6af249991b"
  args = "install"
  env = {
    TZ = "/usr/share/zoneinfo/Asia/Tokyo"
  }
}

action "ignore gh-pages branch" {
  uses = "actions/bin/filter@master"
  needs = ["install"]
  args = "not branch gh-pages"
}

action "build" {
  uses = "actions/npm@de7a3705a9510ee12702e124482fad6af249991b"
  needs = ["ignore gh-pages branch"]
  args = "run build"
  env = {
    TZ = "/usr/share/zoneinfo/Asia/Tokyo"
  }
}

action "only master branch" {
  uses = "actions/bin/filter@master"
  needs = ["build"]
  args = "branch master"
}

action "deploy" {
  uses = "team-lab/npm-github-actions@master"
  needs = ["only master branch"]
  args = "run deploy"
  env = {
    TZ = "/usr/share/zoneinfo/Asia/Tokyo"
  }
  secrets = ["GITHUB_TOKEN"]
}
