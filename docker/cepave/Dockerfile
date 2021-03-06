FROM golang:1.5

MAINTAINER cheminlin@cepave.com
MAINTAINER minimum@cepave.com

ENV GRAFANADIR=/go/src/github.com/Cepave/grafana CONFIGDIR=/config CONFIGFILE=cfg.json GO15VENDOREXPERIMENT=0

# Environment
RUN \
  apt-get -qq update \
  && apt-get -qq -y install nodejs npm \
  && ln -s /usr/bin/nodejs /usr/bin/node \
  && npm config set color false \
  && npm config set registry="http://registry.npmjs.org/" \
  && npm install -g --silent grunt-cli

# Install Grafana
COPY . $GRAFANADIR
WORKDIR $GRAFANADIR
RUN \
  go run build.go setup \
  && godep restore \
  && go get github.com/toolkits/file \
  && go build . \
  && npm install --silent \
  && grunt build \
  && apt-get autoremove \
  && apt-get autoclean \
  && mkdir -p $CONFIGDIR \
  && touch $CONFIGDIR/grafana.json \
  && ln -sf $CONFIGDIR/grafana.json $GRAFANADIR/cfg.json \
  && rm -f $CONFIGDIR/grafana.json

# Port
EXPOSE 3000 4001

# Start
ENTRYPOINT ["/bin/bash", "-c"]
CMD ["./grafana --config $CONFIGDIR/grafana-custom.ini"]

